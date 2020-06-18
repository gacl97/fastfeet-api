import { getRepository, Repository } from 'typeorm';

import IDeliveriesRepository from '@modules/deliveries/repositories/IDeliveriesRepository';
import Delivery from '@modules/deliveries/infra/typeorm/entities/Delivery';
import ICreateDeliveryDTO from '@modules/deliveries/dtos/ICreateDeliveryDTO';

class DeliveryRepository implements IDeliveriesRepository {
  private ormRepository: Repository<Delivery>;

  constructor() {
    this.ormRepository = getRepository(Delivery);
  }

  public async create({
    product,
    deliveryman_id,
    recipient_id,
  }: ICreateDeliveryDTO): Promise<Delivery> {
    const delivery = this.ormRepository.create({
      product,
      deliveryman_id,
      recipient_id,
    });
    await this.ormRepository.save(delivery);

    return delivery;
  }

  public async findAllDeliveries(): Promise<Delivery[]> {
    const deliveries = await this.ormRepository.find();

    return deliveries;
  }

  public async findById(delivery_id: string): Promise<Delivery | undefined> {
    const delivery = await this.ormRepository.findOne(delivery_id);

    return delivery;
  }

  public async update(delivery: Delivery): Promise<Delivery> {
    await this.ormRepository.save(delivery);

    return delivery;
  }

  public async deleteDelivery(delivery: Delivery): Promise<void> {
    await this.ormRepository.remove(delivery);
  }
}

export default DeliveryRepository;
