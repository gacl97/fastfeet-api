import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Delivery from '@modules/deliveries/infra/typeorm/entities/Delivery';
import IDeliveriesRepository from '@modules/deliveries/repositories/IDeliveriesRepository';
import IDeliverersRepository from '@modules/deliverers/repositories/IDeliverersRepository';

interface IRequestDTO {
  delivery_id: string;
  deliverer_id: string;
}

@injectable()
class UpdateWithdrawalOrderEndService {
  constructor(
    @inject('DeliverersRepository')
    private delivererRepository: IDeliverersRepository,

    @inject('DeliveriesRepository')
    private deliveryRepository: IDeliveriesRepository,
  ) {}

  public async execute({
    delivery_id,
    deliverer_id,
  }: IRequestDTO): Promise<Delivery> {
    const delivery = await this.deliveryRepository.findById(delivery_id);

    if (!delivery) {
      throw new AppError('Order not found.', 404);
    }

    const deliverer = await this.delivererRepository.findById(deliverer_id);

    if (!deliverer) {
      throw new AppError('Deliverer not found.', 404);
    }

    if (delivery.canceled_at) {
      throw new AppError('Order has been canceled');
    }

    if (!delivery.start_date) {
      throw new AppError('Order has not been withdrawn.');
    }

    if (delivery.end_date) {
      throw new AppError('Order has already been delivered');
    }

    const current_date = new Date();

    Object.assign(delivery, {
      end_date: current_date,
      status: 'delivered',
    });

    await this.deliveryRepository.save(delivery);

    return delivery;
  }
}

export default UpdateWithdrawalOrderEndService;
