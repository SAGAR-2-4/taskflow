const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const generateToken = require("../utils/generateToken");

const  registerUser = async({name, email, password}) => {
    const existingUser = await User.findOne({email});

    if(existingUser){
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    const token = generateToken(user._id);

    return{
        user:{
            id: user._id,
            name: user.name,
            email:user.email,
            avatar:user.avatar,
        },
        token,
    };
};

const loginUser = async({email, password}) => {
    const user = await User.findOne({email});

    if(!user) {
        throw new Error("Invalid email or password");

    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if(!isPasswordMatch) {
        throw new Error("Invalid email or password");
        
    }

    const token = generateToken(user._id);


    return{
        user: {
            id: user._id,
            name: user.name,
            email:user.email,
            avatar: user.avatar,
        },
        token,
    };
};

module.exports = {
    registerUser,
    loginUser,
};





