let User = require("../models/User");
let bcrypt = require("bcrypt");

let login = async (req, res) => {
    try {

        let { Email, Password } = req.body;

        let user = await User.findOne({ Email: Email.trim().toLowerCase() }).sort({ _id: -1 });

        if (!user) {
            return res.status(404).json({
                message: "Email not found"
            });
        }
        console.log("Email found:", user.Email);
        console.log("Stored password:", user.Password);
        let passwordMatch = await bcrypt.compare(Password, user.Password);
        console.log("Password match:", passwordMatch)
        if (!passwordMatch) {
            return res.status(401).json({
                message: "Wrong password"
            });
        }
        res.cookie("loginSession", user._id.toString(), {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        })
        console.log("Cookie set command executed");
        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                Name: user.Name,
                Email: user.Email,
                Role: user.Role
            }
        });

    } catch (err) {
        res.status(500).json({
            message: "Login failed",
            error: err.message
        });
    }
};

module.exports = login;