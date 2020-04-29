// mongoose is our ODM, a wrapper on top of mongo, that allows us to make queries a little more efficiently
const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb+srv://Michael:Wakethefuckup1@cluster0-wc3rz.mongodb.net/test?retryWrites=true&w=majority", {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

module.exports.User = require("./user");
module.exports.Message = require("./message");