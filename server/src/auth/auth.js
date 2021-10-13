import jwt from 'jsonwebtoken';
import config from '../config/config';

export function authenticate(req, res, next) {
  try {
    const token = req.header('x-access-token')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Access Denied',
      });
    }

    const verify = jwt.verify(token, config.TOKEN.SECRET_KEY);
    if (!verify) {
      return res.status(401).json({
        success: false,
        error: 'Invalid Token',
      });
    }

    req.user = verify;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}
