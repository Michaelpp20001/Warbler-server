const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function(req, res, next) {
    // Whenever writing an async function, make sure wrap in a try catch
    try{
        // fingding a user
        let user = await db.User.findOne({
            email: req.body.email
        });
        let { id, username, profileImageUrl } = user
            // checking if their password matches what was sent to the server
            // if it matches
            // log them in
        let isMatch = await user.comparePassword(req.body.password);
        if(isMatch) {
            let token = jwt.sign({
                id,
                username,
                profileImageUrl
            },
            process.env.SECRET_KEY
            );
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            });
        } else {
            return next({
                status: 400,
                message: "Invalid Email/Password."
            })
        }
    } catch (e) {
        return next({
            status: 400,
            message: "Invalid Email/Password."
        })
    }
};

exports.signup = async function(req, res, next) {
    try {
        // create a user
        // create a token (signing a token)
        // process.env.SECRET_KEY
        let user = await db.User.create(req.body);
        // object destructuring
        let {id, username, profileImageUrl} = user
        // if id = id, shorthand for objects is just one word
        let token = jwt.sign({
            id,
            username,
            profileImageUrl
        },
        process.env.SECRET_KEY
        );
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        });
    } catch (err) {
        // see what kind of error
        // if it is a certain error
        // respond with username/email already taken
        // otherwise just send back a generic 400
        if(err.code === 11000) {// 11000 mongoose error code
            err.message = "Sorry, that username and/or email is taken";
        }
        return next({
            status: 400,
            message: err.message
        });
    }
}