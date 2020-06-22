import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDeliveryProblemsRepository from '../repositories/IDeliveryProblemsRepository';
import DeliveryProblem from '../infra/typeorm/entities/DeliveryProblem';
import IDeliveriesRepository from '../repositories/IDeliveriesRepository';

@injectable()
class ListDeliveryProblemsService {
  constructor(
    @inject('DeliveryProblemsRepository')
    private deliveryProblemsRepository: IDeliveryProblemsRepository,

    @inject('DeliveriesRepository')
    private deliveriesRepository: IDeliveriesRepository,
  ) {}

  public async execute(delivery_id: string): Promise<DeliveryProblem[]> {
    const delivery = await this.deliveriesRepository.findById(delivery_id);

    if (!delivery) {
      throw new AppError('Delivery not found', 404);
    }

    const deliveryProblems = await this.deliveryProblemsRepository.findAllDeliveryProblemsById(
      delivery_id,
    );

    return deliveryProblems;
  }
}

export default ListDeliveryProblemsService;
