const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = require("../models/userSchema");

const register = async (req, res) => {
  try {
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password,10);
    const data = await new userSchema({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    const result = await data.save();
    res.status(201).json({
      status: "success",
      message: "user-created",
      result,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(404).json({
        status: "failed",
        message: "required email or password",
      });
    } else {
      const user = await userSchema.findOne({ email: email });
      if (!user) {
        res.status(404).json({
          status: "failed",
          message: "required email",
        });
      }
      const passwordRes = await bcrypt.compare(password, user.password);
      if (user && !passwordRes) {
        res.status(404).json({
          status: "failed",
          message: "password incorrect",
        });
      }
      const token = jwt.sign({ id: user._id, email: user.email }, "vinu", {
        expiresIn: "2h",
      });
      res.status(200).json({
        status: "success",
        message: "login successfull",
        token: token,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports = { register, login };
