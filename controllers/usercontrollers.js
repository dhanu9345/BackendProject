let User = require("../models/user.js");
let bcrypt=require("bcrypt")
let register = async (req, res) => {
    try {

        let { Name, Email, Password } = req.body;
        let hashPassword=await bcrypt.hash(Password,10)

        let user = await User.create({
            Name,
            Email,
            Password:hashPassword
        });

        res.status(201).json({
            message: "User registered successfully",
            user
        });

    } catch (err) {
        res.status(500).json({
            message: "Registration failed",
            error: err.message
        });
    }
};

module.exports = register;