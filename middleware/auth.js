const jwt = require('jsonwebtoken');
const User = require('../model/User');

exports.isAuthenticatedUser = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.json({
      success: false,
      message: 'Please Login to access this resource',
    });
  }

  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  req.user = await User.findById(decodedToken.id);
  next();
};
