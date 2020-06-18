import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDeliverersRepository from '@modules/deliverers/repositories/IDeliverersRepository';
import Deliverer from '../infra/typeorm/entities/Deliverer';

interface IRequestDTO {
  id: string;
  name: string;
  email: string;
}

@injectable()
class UpdateDelivererService {
  constructor(
    @inject('DeliverersRepository')
    private delivererRepository: IDeliverersRepository,
  ) {}

  public async execute({ id, name, email }: IRequestDTO): Promise<Deliverer> {
    const deliverer = await this.delivererRepository.findById(id);

    if (!deliverer) {
      throw new AppError('Deliverer not found', 404);
    }

    Object.assign(deliverer, {
      name,
      email,
    });

    await this.delivererRepository.save(deliverer);

    return deliverer;
  }
}

export default UpdateDelivererService;
