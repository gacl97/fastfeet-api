import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IRecipientsRepository from '@modules/recipients/repositories/IRecipientsRepository';
import IDeliverersRepository from '@modules/deliverers/repositories/IDeliverersRepository';
import IDeliveriesRepository from '../repositories/IDeliveriesRepository';
import Delivery from '../infra/typeorm/entities/Delivery';

interface IRequestDTO {
  product: string;
  deliveryman_id: string;
  recipient_id: string;
  delivery_id: string;
}

@injectable()
class UpdateDeliveryService {
  constructor(
    @inject('DeliveriesRepository')
    private deliveryRepository: IDeliveriesRepository,

    @inject('RecipientsRepository')
    private recipientRepository: IRecipientsRepository,

    @inject('DeliverersRepository')
    private delivererRepository: IDeliverersRepository,
  ) {}

  public async execute({
    product,
    deliveryman_id,
    recipient_id,
    delivery_id,
  }: IRequestDTO): Promise<Delivery> {
    const delivery = await this.deliveryRepository.findById(delivery_id);

    if (!delivery) {
      throw new AppError('Delivery not found', 404);
    }

    if (recipient_id) {
      const recipient = await this.recipientRepository.findById(recipient_id);

      if (!recipient) {
        throw new AppError('Recipient not found', 404);
      }
    }

    if (deliveryman_id) {
      const deliverer = await this.delivererRepository.findById(deliveryman_id);

      if (!deliverer) {
        throw new AppError('Deliverer not found', 404);
      }
    }

    Object.assign(delivery, {
      product,
      deliveryman_id,
      recipient_id,
    });

    await this.deliveryRepository.update(delivery);

    return delivery;
  }
}

export default UpdateDeliveryService;
