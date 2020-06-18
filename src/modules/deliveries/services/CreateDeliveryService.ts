import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IRecipientsRepository from '@modules/recipients/repositories/IRecipientsRepository';
import IDeliverersRepository from '@modules/deliverers/repositories/IDeliverersRepository';
import IDeliveriesRepository from '../repositories/IDeliveriesRepository';
import Delivery from '../infra/typeorm/entities/Delivery';

interface IRequestDTO {
  product: string;
  deliveryman_id: string;
  recipient_id: string;
}

@injectable()
class CreateDeliveryService {
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
    recipient_id,
    deliveryman_id,
  }: IRequestDTO): Promise<Delivery> {
    const recipient = await this.recipientRepository.findById(recipient_id);

    if (!recipient) {
      throw new AppError('Recipient not found', 404);
    }

    const deliverer = await this.delivererRepository.findById(deliveryman_id);

    if (!deliverer) {
      throw new AppError('Deliverer not found', 404);
    }

    const delivery = await this.deliveryRepository.create({
      product,
      recipient_id,
      deliveryman_id,
    });

    return delivery;
  }
}

export default CreateDeliveryService;
