const mongoose = require("mongoose");
// bcrypt allows for password hashing
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    //must have a password hashing here, otherwise just a string could get you fired!!
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String
    },
    // adding the message schema to create a relation
    messages : [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
        }
    ]
});

// pre save hook before document is saved, run this async function hashing the password
userSchema.pre("save", async function(next) {
    try {
        if (!this.isModified("password")) {
            return next();
        }
        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    } catch (err) {
        return next(err);
    }
});

// simple password comparison function, making sure users put in the correct password
userSchema.methods.comparePassword = async function(candidatePassword, next) {
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {}
};

// This is how we then make that model
const User = mongoose.model("User", userSchema);

module.exports = User;