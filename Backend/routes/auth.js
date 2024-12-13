const express = require("express");
const { loginUser, registerUser } = require("../controllers/auth");
const passport = require("passport");
const router = express.Router();

// login ROUTER
router.post(
  "/login",
  passport.authenticate("local", 
    { 
      failureRedirect: "/register", 
    // failureFlash: true 
  }
),
  loginUser
);

//register ROUTER
router.post("/register", registerUser);

module.exports = router;
