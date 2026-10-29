let User = require("../models/User");

let loginStatus = async (req, res) => {
    try {
        let userId = req.cookies?.loginSession;

        if (!userId) {
            return res.json({ loggedIn: false });
        }

        let user = await User.findById(userId);

        if (!user) {
            res.clearCookie("loginSession");
            return res.json({ loggedIn: false });
        }

        return res.json({ loggedIn: true });

    } catch (err) {
        return res.status(500).json({
            loggedIn: false
        });
    }
};

module.exports = loginStatus;