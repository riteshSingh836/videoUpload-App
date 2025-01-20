import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Expecting format: Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // Attach decoded user info to the request object
    // console.log(payload);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid Token' });
  }

};

export default authMiddleware;