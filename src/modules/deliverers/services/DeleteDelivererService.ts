import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDeliverersRepository from '@modules/deliverers/repositories/IDeliverersRepository';
// import Deliverer from '../infra/typeorm/entities/Deliverer';

interface IRequestDTO {
  deliverer_id: string;
}

@injectable()
class DeleteDelivererService {
  constructor(
    @inject('DeliverersRepository')
    private deliverersRepository: IDeliverersRepository,
  ) {}

  public async execute({ deliverer_id }: IRequestDTO): Promise<void> {
    const deliverer = await this.deliverersRepository.findById(deliverer_id);

    if (!deliverer) {
      throw new AppError('Deliverer not found', 404);
    }

    await this.deliverersRepository.deleteDeliverer(deliverer);
  }
}

export default DeleteDelivererService;
