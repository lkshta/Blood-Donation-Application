// const CryptoJs = require("crypto-js");
// const jwt = require("jsonwebtoken");
const User = require("../models/User");
// const dotenv = require("dotenv");
// dotenv.config();

// REGISTER USER
module.exports.registerUser = async (req, res, next) => {
  try {
    let {  name,email, password } = req.body;
    const newUser = new User({ email,name });
    const registereduser = await User.register(newUser, password);
    console.log(registereduser);
    req.login(registereduser, (err) => {
      if (err) {
        return next(err);
      }
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports.loginUser = async (req, res) => {
  res.send("Welcome, login successful");
  // return res.status(404).json("Not Found");
};

//LOGIN USER

// const loginUser = async (req, res) => {
//   //   console.log(req.body.email);
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) {
//       return res.status(401).json("You have not registered");
//     }

//     const hashedPassword = CryptoJs.AES.decrypt(
//       user.password,
//       process.env.PASS
//     );

//     const originalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);

//     if (originalPassword !== req.body.password) {
//       return res.status(500).json("wrong Password");
//     }

//     const { password, ...info } = user._doc;

//     const accessToken = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SEC,
//       { expiresIn: "10d" }
//     );

//     res.status(200).json({ ...info, accessToken });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };
// module.exports = { loginUser };
