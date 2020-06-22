import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDeliveryProblemsRepository from '../repositories/IDeliveryProblemsRepository';
import IDeliveriesRepository from '../repositories/IDeliveriesRepository';

@injectable()
class DeleteDeliveryProblemService {
  constructor(
    @inject('DeliveryProblemsRepository')
    private deliveryProblemsRepository: IDeliveryProblemsRepository,

    @inject('DeliveriesRepository')
    private deliveriesRepository: IDeliveriesRepository,
  ) {}

  public async execute(delivery_id: string): Promise<void> {
    const deliveryProblem = await this.deliveryProblemsRepository.findById(
      delivery_id,
    );

    if (!deliveryProblem) {
      throw new AppError('Delivery Problem not found', 404);
    }

    const delivery = await this.deliveriesRepository.findById(
      deliveryProblem.delivery_id,
    );

    if (!delivery) {
      throw new AppError('Delivery not found', 404);
    }

    const canceledHour = new Date();

    Object.assign(delivery, {
      canceled_at: canceledHour,
    });

    await this.deliveriesRepository.save(delivery);
  }
}

export default DeleteDeliveryProblemService;
