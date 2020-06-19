import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Delivery from '@modules/deliveries/infra/typeorm/entities/Delivery';
import IDeliveriesRepository from '@modules/deliveries/repositories/IDeliveriesRepository';
import IDeliverersRepository from '@modules/deliverers/repositories/IDeliverersRepository';

@injectable()
class ListAvailableWithdrawalService {
  constructor(
    @inject('DeliverersRepository')
    private delivererRepository: IDeliverersRepository,

    @inject('DeliveriesRepository')
    private deliveryRepository: IDeliveriesRepository,
  ) {}

  public async execute(deliverer_id: string): Promise<Delivery[]> {
    const deliverer = await this.delivererRepository.findById(deliverer_id);

    if (!deliverer) {
      throw new AppError('Deliverer not found.', 404);
    }

    const deliveries = await this.deliveryRepository.findAvailableDeliveries(
      deliverer_id,
    );

    return deliveries;
  }
}

export default ListAvailableWithdrawalService;
