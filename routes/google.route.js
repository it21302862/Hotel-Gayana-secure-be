const express = require("express");
const passport = require("passport");

const router = express.Router();
const CLIENT_URL = "http://localhost:3000/";

// Google login success route
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: req.user,
    });
  } else {
    res.status(403).json({ success: false, message: "Unauthorized" });
  }
});

// Google login failure route
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Login failed",
  });
});

// Google authentication route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google callback route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/auth/login/failed",
  })
);

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Logout error" });
    }
    res.redirect(CLIENT_URL);
  });
});

module.exports = router;
