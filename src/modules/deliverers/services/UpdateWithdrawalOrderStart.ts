import { inject, injectable } from 'tsyringe';
import { setHours, setMinutes, setSeconds, isBefore, isAfter } from 'date-fns';

import AppError from '@shared/errors/AppError';

import Delivery from '@modules/deliveries/infra/typeorm/entities/Delivery';
import IDeliveriesRepository from '@modules/deliveries/repositories/IDeliveriesRepository';
import IDeliverersRepository from '@modules/deliverers/repositories/IDeliverersRepository';

interface IRequestDTO {
  delivery_id: string;
  deliverer_id: string;
}

@injectable()
class UpdateWithdrawalOrderStart {
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

    if (delivery.start_date) {
      throw new AppError('Order already withdrawn.');
    }

    if (delivery.end_date) {
      throw new AppError('Order has already been delivered');
    }

    if (delivery.canceled_at) {
      throw new AppError('Order has been canceled');
    }

    const current_date = new Date();

    const start_hour = setSeconds(setMinutes(setHours(new Date(), 5), 0), 0);
    const end_hour = setSeconds(setMinutes(setHours(new Date(), 15), 0), 0);

    if (isBefore(current_date, start_hour) || isAfter(current_date, end_hour)) {
      throw new AppError('Withdrawals can only be made between 8am and 18pm');
    }

    const numberOfWithdrawals = await this.deliveryRepository.findAndCountWithdrawals(
      {
        start_hour,
        end_hour,
        deliverer_id,
      },
    );

    if (numberOfWithdrawals === 5) {
      throw new AppError(
        'It is only allowed to withdraw a maximum of 5 orders.',
      );
    }

    Object.assign(delivery, {
      start_date: current_date,
    });

    await this.deliveryRepository.save(delivery);

    return delivery;
  }
}

export default UpdateWithdrawalOrderStart;
