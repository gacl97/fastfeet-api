import Delivery from '@modules/deliveries/infra/typeorm/entities/Delivery';

import ICreateDeliveryDTO from '@modules/deliveries/dtos/ICreateDeliveryDTO';
import IUpdateWithdrawalOrderStartDTO from '@modules/deliveries/dtos/IUpdateWithdrawalOrderStartDTO';

export default interface IDeliveriesRepository {
  create(data: ICreateDeliveryDTO): Promise<Delivery>;
  findAllDeliveries(): Promise<Delivery[]>;
  findById(delivery_id: string): Promise<Delivery | undefined>;
  update(delivery: Delivery): Promise<Delivery>;
  deleteDelivery(delivery: Delivery): Promise<void>;
  findAndCountWithdrawals(
    data: IUpdateWithdrawalOrderStartDTO,
  ): Promise<number>;
  save(delivery: Delivery): Promise<Delivery>;
}
