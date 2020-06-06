const User = require('../models/user.model');
const validator = require("email-validator");
const bcrypt = require('bcrypt');

// function to check if user is valid or not
exports.signIn = async function(req, res) {
    console.log("req.body", req.body);
    let { email, password} = req.body;
    if(!email || !password) {
        return res.send({
            status: 400,
            error: "Invalid Params (params are missing)",
            success: false
        })
    }
    password = password.toString();
    const userObj = await User.findOne({email});
    console.log("userObj", userObj);
    if(userObj) {
        const passwordMatch = bcrypt.compareSync(password, userObj.password);
        console.log("passwordMatch", passwordMatch);
        if (!passwordMatch) {
            return res.send({
                status: 401,
                error: "Invalid Credentials",
                success: false
            });
        }
        return res.send({
            status: 200,
            error: false,
            success: true
        })
    } else {
        return res.send({
            status: 400,
            error: "Email doesn't exists, try signing up",
            success: false,
        })
    }
};

// function to signUp a user
exports.signUp = async function(req, res) {
    console.log("req.body", req.body);
    let {name, password, email} = req.body;
    if(!name || !password || !email) {
        return res.send({
            status: 400,
            error: "Invalid Params (params are missing)",
            success: false
        });
    }
    if(!validator.validate(email)) {
        return res.send({
            status: 400,
            error: "Email is invalid",
            success: false
        })
    }
    const exists = await emailExists(email);
    if(exists.status) {
        return res.send({
            status: 400,
            error: "User email already exists",
            success: false,
        })
    }
    password = password.toString();
    const hashedPassword = await getPasswordHash(password);
    User.create({
        name,
        password: hashedPassword,
        email
    }, (error, result) => {
        if(error) {
            console.log("error", error);
            return res.send({
                status: 504,
                error: "Unknown server issue",
                success: false,
            })
        }
        return res.send({
            status: 204,
            success: true,
        });
    });
};

function getPasswordHash(password) {
    return new Promise((resolve, reject) => {
        const saltRounds = 10; // Length of the Salt to be added to the passpword before hashing.
        return bcrypt.genSalt(saltRounds, (err, salt) => {
            // Generate hash of the password with added salt.
            bcrypt.hash(password, salt, (err1, hash) => {
            if(err1) return reject(err1);
                return resolve(hash)
            });
        });
    });
}

async function emailExists(email) {
    console.log("email", email);
    try {
        const users = await User.find({email});
        console.log("userCount", users.length);
        return {
            error: false,
            status: users.length
        }
    } catch(error) {
        return {
            error: "error connecting to db",
            status: 0
        }
    }
}

