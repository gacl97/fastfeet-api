import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import auth from '@config/auth';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';

import Deliverer from '@modules/deliverers/infra/typeorm/entities/Deliverer';
import IUsersRepository from '../repositories/IUsersRepository';
import IDeliverersRepository from '../../deliverers/repositories/IDeliverersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequestDTO {
  email: string;
  password: string;
  role: 'admin' | 'deliverer';
}

interface IAuthenticateResponse {
  user: User | Deliverer;
  token: string;
  isAdmin: boolean;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('DeliverersRepository')
    private deliverersRepository: IDeliverersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
    role,
  }: IRequestDTO): Promise<IAuthenticateResponse> {
    let user;

    if (role === 'admin') {
      user = await this.usersRepository.findByEmail(email);
    }

    if (role === 'deliverer') {
      user = await this.deliverersRepository.findByEmail(email);
    }

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const verifyPasswords = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!verifyPasswords) {
      throw new AppError('Email or password is wrong, please try again');
    }

    const { secret, expiresIn } = auth.jwt;

    const token = sign(
      {
        role,
      },
      secret,
      {
        subject: user.id,
        expiresIn,
      },
    );

    return {
      user,
      token,
      isAdmin: role === 'admin',
    };
  }
}

export default AuthenticateUserService;
