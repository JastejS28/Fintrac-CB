// backend/src/middleware/auth.middleware.js

import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import ErrorWrapper from '../utils/ErrorWrapper.js';

export const protect = ErrorWrapper(async (req, res, next) => {
  let token;

  // 1. Check for the token in the authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // We split it by the space and take the second part, which is the token itself
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new ErrorHandler(401, 'Not authorized, no token provided.');
  }

  // 2. Verify the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3. Attach the user to the request object
  // We use the 'id' from the token's payload to find the user in the database.
  // We use .select('-password') to exclude the password hash from being attached.
  req.user = await User.findById(decoded.id).select('-password');

  if (!req.user) {
    throw new ErrorHandler(404, 'The user belonging to this token does no longer exist.');
  }
  
  // 4. Call the next middleware/controller
  next();
});