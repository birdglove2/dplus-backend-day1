const { BadRequestError } = require('../../errors/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../schema/User');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const emailUser = await User.findOne({ email });
  const nameUser = await User.findOne({ name });

  if (emailUser) {
    throw new BadRequestError('Email is already in used');
  }

  if (nameUser) {
    throw new BadRequestError('Name is already in used');
  }

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  await newUser.save();

  // Generate jwt key
  const token = jwt.sign(
    {
      id: newUser._id,
      email: newUser.email,
    },
    process.env.JWT_KEY,
    { expiresIn: process.env.JWT_EXPIRE }
  );

  const response = {
    success: true,
    token,
  };
  res.status(201).cookie('token', token).json(response);
};

module.exports = register;
