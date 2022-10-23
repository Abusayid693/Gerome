import jwt from 'jsonwebtoken';
import {env} from 'process';

class JwtService {
  getAccessToken(id: string) {
    const token = jwt.sign(
      {
        id
      },
      env.JWT_SECRET,
      {
        expiresIn: env.JWT_EXPIRE,
        issuer: env.JWT_ISSUER,
        audience: env.JWT_AUDIANCE,
        subject: 'JWT_ACCESS_TYPE'
      }
    );

    return token;
  }

  getRefreshToken(id: string) {
    const token = jwt.sign(
      {
        id
      },
      env.JWT_REFRESH_SECRET,
      {
        expiresIn: env.JWT_REFRESH_EXPIRE,
        issuer: env.JWT_ISSUER,
        audience: env.JWT_AUDIANCE,
        subject: 'JWT_REFRESH_TYPE'
      }
    );

    return token;
  }
}

export default new JwtService();
