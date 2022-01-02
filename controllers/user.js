require("dotenv").config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");

const User = require("../models/User");

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const isPswValid = await bcrypt.compare(password, user.password);

    if (!user || !isPswValid) {
      throw new UnauthorizedError({
        userMessage: "Invalid Credentials",
        data: {
          email,
          password,
        },
      });
    }

    const token = jwt.sign(
      { user_id: user._id.toString(), email },
      process.env.HASH_SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;

    return res.status(200).json({
      token,
      userId: user._id.toString(),
      user,
    });
  } catch (err) {
    next(err);
    return res.status(500).json({ message: "Server error!" });
  }
};

const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!isEmail(email)) return res.status(401).send("Invalid Email");

  if (password.length < 6) {
    return res.status(401).send("Password must be atleast 6 characters");
  }

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    const { HASH_SECRET_KEY } = process.env;

    if (existingUser)
      return res.status(401).json({ message: "User already registered!" });

    const passwordCrypt = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: passwordCrypt,
    });

    const token = jwt.sign(
      { userId: user._id.toString(), email },
      HASH_SECRET_KEY,
      {
        expiresIn: "3h",
      }
    );

    user.token = token;

    await user.save();

    const newUser = user.toObject();

    res.status(201).json({
      userId: newUser._id.toString(),
      user: user,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send(`Server error`);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const user = await User.findById(user_id).select('-password');

    return res.status(200).json({ user });
  } catch (err) {
    next(err);
    return res.status(500).json({ message: `"Server error! " Err: ${err}` });
  }
};

module.exports = { signIn, signUp, getCurrentUser };
