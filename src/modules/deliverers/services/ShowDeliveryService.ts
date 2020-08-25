import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDeliveriesRepository from '@modules/deliveries/repositories/IDeliveriesRepository';
import Delivery from '@modules/deliveries/infra/typeorm/entities/Delivery';

interface IRequestDTO {
  id: string;
}

@injectable()
class ShowDeliveryService {
  constructor(
    @inject('DeliveriesRepository')
    private deliveriesRepository: IDeliveriesRepository,
  ) {}

  public async execute({ id: delivery_id }: IRequestDTO): Promise<Delivery> {
    const delivery = await this.deliveriesRepository.findById(delivery_id);

    if (!delivery) {
      throw new AppError('Delivery not found', 404);
    }

    return delivery;
  }
}

export default ShowDeliveryService;
