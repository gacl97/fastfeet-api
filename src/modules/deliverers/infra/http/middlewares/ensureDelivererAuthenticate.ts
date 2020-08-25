import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: string;
  exp: string;
  sub: string;
  role: 'admin' | 'deliverer';
}

function ensureDelivererAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  const { secret } = authConfig.jwt;

  try {
    const decoded = verify(token, secret);

    const { sub, role } = decoded as ITokenPayload;

    if (role !== 'deliverer') {
      throw new Error();
    }

    request.deliverer = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}

export default ensureDelivererAuthenticate;
