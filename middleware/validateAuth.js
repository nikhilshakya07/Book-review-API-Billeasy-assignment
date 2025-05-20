const { z } = require("zod");

// Signup validation schema
const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Login validation schema
const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const validateSignup = (req, res, next) => {
  try {
    signupSchema.parse(req.body);
    next();
  } catch (e) {
    const errors = e.errors.map(err => err.message);
    return res.status(400).json({ message: errors.join(", ") });
  }
};

const validateLogin = (req, res, next) => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (e) {
    const errors = e.errors.map(err => err.message);
    return res.status(400).json({ message: errors.join(", ") });
  }
};

module.exports = { validateSignup, validateLogin };
