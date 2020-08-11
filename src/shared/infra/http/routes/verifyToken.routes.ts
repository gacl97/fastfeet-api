import { Router, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

const verifyToken = Router();

verifyToken.get(
  '/',
  (request: Request, response: Response): Response => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return response.json({ error: 'Token not found' });
    }

    const [, token] = authHeader.split(' ');

    const { secret } = authConfig;

    try {
      verify(token, secret);
      return response.json({ success: true });
    } catch {
      return response.json({ error: 'Token invalid' });
    }
  },
);

export default verifyToken;
