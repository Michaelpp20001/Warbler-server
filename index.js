// load all of our environment variables
require("dotenv").config();
// also installed nodemon to refresh without killing server,
// npm installed express, mongoose, body parser, cors, bcrypt, jsonwebtoken
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
//importing our error handler function we created
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const messagesRoutes = require("./routes/messages");
const db = require("./models");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");

const PORT = 8081;

// allowing cross oirigin, so we do not get errors in the future
app.use(cors()); 
app.use(bodyParser.json());


// all of my routes here - they will come later
app.use("/api/auth", authRoutes);
app.use(
    "/api/users/:id/messages", 
    loginRequired,
    ensureCorrectUser,
    messagesRoutes
    );

app.get("/api/messages", loginRequired, async function(req, res, next){
    try {
        let messages = await db.Message.find()
        .sort({ createdAt: "desc" })
        .populate("user", {
            username: true,
            profileImageUrl: true
        });
        return res.status(200).json(messages);
    } catch (err) {
        return next(err);
    }
});

// if no routes are reached, telling my application to run a function
// with 3 parameters, 'next' very important for error handling
app.use(function(req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(errorHandler);


// telling node to listen on a certain port
app.listen(PORT, function() {
    console.log(`Server is starting on port ${PORT}`);
})