const { BadRequestError, NotFoundError } = require('../../errors/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../schema/User');

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError('Email or password is invalid');
  }

  const isPasswordMatched = await bcrypt.compareSync(password, user.password);
  if (!isPasswordMatched) {
    throw new BadRequestError('Email or password is invalid');
  }

  // Generate jwt key
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_KEY,
    { expiresIn: process.env.JWT_EXPIRE }
  );

  const response = {
    success: true,
    token,
  };
  res.status(200).cookie('token', token).json(response);
};

module.exports = login;
