const AuthService = require('../services/Auth.service');

const register = async (req, res) => {
  try {
    const user = await AuthService.register(req.body);
    res.status(201).json({
      message: 'Register success',
      user
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const result = await AuthService.login(req.body);
    res.json({
      message: 'Login success',
      token: result.token,
      user: result.user
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { register, login };
