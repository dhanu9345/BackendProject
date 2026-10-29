let express = require("express");
let CryptoJS = require("crypto-js");

let router = express.Router();

let SECRET = process.env.COOKIE_SECRET;



router.post("/save", (req, res) => {
  try {
    let { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Name is required"
      });
    }

    let encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify({ name }),
      SECRET
    ).toString();

    res.cookie("userData", encryptedData, {
      httpOnly: true,
      secure: false,                                                     // Localhost HTTP testing only
      sameSite: "lax",
      maxAge: 10 * 60 * 1000
    });

    res.json({
      message: "Encrypted data cookie-la saved successfully"
    });
  } catch (err) {
    res.status(500).json({
      message: "Encryption failed"
    });
  }
});


router.get("/read", (req, res) => {
  try {
    let encryptedData = req.cookies.userData;

    if (!encryptedData) {
      return res.status(404).json({
        message: "Cookie not found"
      });
    }

    let bytes = CryptoJS.AES.decrypt(
      encryptedData,
      SECRET
    );

    let decryptedText = bytes.toString(
      CryptoJS.enc.Utf8
    );

    if (!decryptedText) {
      return res.status(400).json({
        message: "Unable to decrypt cookie"
      });
    }

    let userData = JSON.parse(decryptedText);

    res.json({
      message: "Decryption successful",
      data: userData
    });
  } catch (err) {
    res.status(500).json({
      message: "Decryption failed"
    });
  }
});


router.post("/clear", (req, res) => {
  res.clearCookie("userData", {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  });

  res.json({
    message: "Cookie cleared"
  });
});
router.get("/check", (req, res) => {
    let loginSession = req.cookies?.loginSession;

    if (!loginSession) {
        return res.status(401).json({
            loggedIn: false,
            message: "Login cookie not found"
        });
    }

    res.json({
        loggedIn: true,
        message: "Login cookie found",
        userId: loginSession
    });
});

module.exports = router;