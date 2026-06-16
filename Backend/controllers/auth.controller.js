const {registerUser, loginUser} = require("../services/auth.service");

const register = async(req, res) => {
    try{
        const result = await registerUser(req.body);

        res.status(201).json({
            success: true,
            message:"Registration successful",
            data: result,
        });
    }catch(error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const login = async(req, res) => {
    try {
        const result = await loginUser(req.body);

        res.status(200).json({
            success: true,
            message:"Login Successful",
            data: result
        })
        
    } catch (error) {
        res.status(401).json({
        success: false,
        message: error.message,
        })
        
    }
}

const getMe = async(req, res) => {
    res.status(200).json({
        success: true,
        message: "Current user fetched successfully",
        data: {
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                avatar: req.user.avatar,
            },
        },
    });
};

module.exports = {
    register,
    login,
    getMe,
};