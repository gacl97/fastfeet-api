import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IDeliverersRepository from '../repositories/IDeliverersRepository';
import Deliverer from '../infra/typeorm/entities/Deliverer';

interface IRequestDTO {
  name: string;
  email: string;
}

@injectable()
class CreateDelivererService {
  constructor(
    @inject('DeliverersRepository')
    private deliverersRepository: IDeliverersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email }: IRequestDTO): Promise<Deliverer> {
    const delivererExists = await this.deliverersRepository.findByEmail(email);

    if (delivererExists) {
      throw new AppError('Email address already used.');
    }

    const firstName = name.split(' ');

    const hashedPassword = await this.hashProvider.generateHash(
      `fastfeet:${firstName[0].toLowerCase()}`,
    );

    const deliverer = await this.deliverersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return deliverer;
  }
}

export default CreateDelivererService;
