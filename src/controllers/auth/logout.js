const logout = async (req, res) => {
  const response = {
    success: true,
    data: req.currentUser,
  };

  res.status(200).clearCookie('token').json(response);
};

module.exports = logout;
