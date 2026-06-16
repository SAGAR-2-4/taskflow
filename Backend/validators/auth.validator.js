const validateRegister = (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  const errors = {};

  if (!name || name.trim() === "") {
    errors.name = "Name is required";
  } else if (name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  } else if (name.trim().length > 50) {
    errors.name = "Name cannot exceed 50 characters";
  }

  if (!email || email.trim() === "") {
    errors.email = "Email is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address";
    }
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  next();
};


const validateLogin = (req, res, next) => {
    const {email, password } = req.body;

    const errors = {};

    if (!email || email.trim() === "") {
    errors.email = "Email is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address";
    }
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }


  if(Object.keys(errors).length > 0){
    return res.status(400).json({
        success: false,
        errors,
    });
  }

  next();

};

module.exports = {
  validateRegister,
  validateLogin
};