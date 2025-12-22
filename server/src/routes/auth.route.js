const express = require("express");
const router = express.Router();
const { register, login, getMe } = require("../controllers/auth.controller");
const {
  registerValidation,
  loginValidation,
} = require("../middlewares/validator.middleware");
const { protect } = require("../middlewares/auth.middleware");

// Public routes
router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

// Protected routes
router.get("/me", protect, getMe);

module.exports = router;
