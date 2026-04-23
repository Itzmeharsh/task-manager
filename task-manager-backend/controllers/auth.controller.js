const bcrypt = require("bcrypt");
const { User } = require("../models");
const generateToken = require("../utils/generateToken");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await User.findOne({ where: { email } });
    if (exist) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    res.json({
      token: generateToken(user.id),
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    res.json({
      token: generateToken(user.id),
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};