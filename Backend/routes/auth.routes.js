const express = require("express");
const { register, login, getMe }  =require("../controllers/auth.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", register);

router.get("/login", login);

router.get("/me" ,protect, getMe)

module.exports = router;