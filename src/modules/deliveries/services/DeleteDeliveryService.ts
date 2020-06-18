import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDeliveriesRepository from '../repositories/IDeliveriesRepository';

@injectable()
class DeleteDeliveryService {
  constructor(
    @inject('DeliveriesRepository')
    private deliveryRepository: IDeliveriesRepository,
  ) {}

  public async execute(delivery_id: string): Promise<void> {
    const delivery = await this.deliveryRepository.findById(delivery_id);

    if (!delivery) {
      throw new AppError('Delivery not found', 404);
    }

    await this.deliveryRepository.deleteDelivery(delivery);
  }
}

export default DeleteDeliveryService;
