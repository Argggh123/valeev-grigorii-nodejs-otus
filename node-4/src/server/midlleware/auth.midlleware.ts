import { verify } from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'no auth' });
    }

    req.user = verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    res.status(401).json({ message: 'no auth' });
  }
}
