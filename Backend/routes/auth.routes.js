const express = require("express");
const { register, login, getMe }  =require("../controllers/auth.controller");
const { protect } = require("../middlewares/auth.middleware");
const {validateRegister} = require("../validators/auth.validator")
const router = express.Router();

router.post("/register", validateRegister, register);

router.get("/login", login);

router.get("/me" ,protect, getMe)



module.exports = router;