
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import ErrorWrapper from '../utils/ErrorWrapper.js';

export const protect = ErrorWrapper(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new ErrorHandler(401, 'Not authorized, no token provided.');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  
  req.user = await User.findById(decoded.id).select('-password');

  if (!req.user) {
    throw new ErrorHandler(404, 'The user belonging to this token does no longer exist.');
  }
  
  next();
});