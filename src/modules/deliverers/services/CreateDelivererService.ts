import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDelivererRepository from '../repositories/IDelivererRepository';
import Deliverer from '../infra/typeorm/entities/Deliverer';

interface IRequestDTO {
  name: string;
  email: string;
}

@injectable()
class CreateDelivererService {
  constructor(
    @inject('DeliverersRepository')
    private deliverersRepository: IDelivererRepository,
  ) {}

  public async execute({ name, email }: IRequestDTO): Promise<Deliverer> {
    const delivererExists = await this.deliverersRepository.findByEmail(email);

    if (delivererExists) {
      throw new AppError('Email address already used.');
    }

    const deliverer = await this.deliverersRepository.create({
      name,
      email,
    });

    return deliverer;
  }
}

export default CreateDelivererService;
