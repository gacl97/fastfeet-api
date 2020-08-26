import { getRepository, Repository, Between, Not, IsNull } from 'typeorm';

import Delivery from '@modules/deliveries/infra/typeorm/entities/Delivery';

import IDeliveriesRepository from '@modules/deliveries/repositories/IDeliveriesRepository';

import ICreateDeliveryDTO from '@modules/deliveries/dtos/ICreateDeliveryDTO';
import IUpdateWithdrawalOrderStartDTO from '@modules/deliveries/dtos/IUpdateWithdrawalOrderStartDTO';

class DeliveryRepository implements IDeliveriesRepository {
  private ormRepository: Repository<Delivery>;

  constructor() {
    this.ormRepository = getRepository(Delivery);
  }

  public async create({
    product,
    deliveryman_id,
    recipient_id,
    status,
  }: ICreateDeliveryDTO): Promise<Delivery> {
    const delivery = this.ormRepository.create({
      product,
      deliveryman_id,
      recipient_id,
      status,
    });
    await this.ormRepository.save(delivery);

    return delivery;
  }

  public async findAllDeliveries(): Promise<Delivery[]> {
    const deliveries = await this.ormRepository.find({
      relations: ['recipient', 'deliveryman'],
    });

    return deliveries;
  }

  public async findById(delivery_id: string): Promise<Delivery | undefined> {
    const delivery = await this.ormRepository.findOne({
      where: {
        id: delivery_id,
      },
      relations: ['recipient'],
    });

    return delivery;
  }

  public async update(delivery: Delivery): Promise<Delivery> {
    await this.ormRepository.save(delivery);

    return delivery;
  }

  public async deleteDelivery(delivery: Delivery): Promise<void> {
    await this.ormRepository.remove(delivery);
  }

  public async findAndCountWithdrawals({
    start_hour,
    end_hour,
    deliverer_id,
  }: IUpdateWithdrawalOrderStartDTO): Promise<number> {
    const [, quantity] = await this.ormRepository.findAndCount({
      where: {
        deliveryman_id: deliverer_id,
        start_date: Between(start_hour, end_hour),
      },
    });

    return quantity;
  }

  public async save(delivery: Delivery): Promise<Delivery> {
    await this.ormRepository.save(delivery);

    return delivery;
  }

  public async findCompleteDeliveries(
    deliverer_id: string,
  ): Promise<Delivery[]> {
    const deliveries = await this.ormRepository.find({
      where: {
        deliveryman_id: deliverer_id,
        start_date: Not(IsNull()),
        end_date: Not(IsNull()),
        canceled_at: IsNull(),
      },
      relations: ['recipient', 'deliveryman'],
    });

    return deliveries;
  }

  public async findAvailableDeliveries(
    deliverer_id: string,
  ): Promise<Delivery[]> {
    const deliveries = await this.ormRepository.find({
      where: {
        deliveryman_id: deliverer_id,
        start_date: IsNull(),
        end_date: IsNull(),
        canceled_at: IsNull(),
      },
      relations: ['recipient'],
    });

    return deliveries;
  }

  public async findAllDeliveriesByDeliverer(
    deliverer_id: string,
  ): Promise<Delivery[]> {
    const deliveries = await this.ormRepository.find({
      where: {
        deliveryman_id: deliverer_id,
      },
    });

    return deliveries;
  }

  public async findAllPendingDeliveries(
    deliverer_id: string,
  ): Promise<Delivery[]> {
    const deliveries = await this.ormRepository.find({
      where: {
        deliveryman_id: deliverer_id,
        start_date: Not(IsNull()),
        end_date: IsNull(),
        canceled_at: IsNull(),
      },
      relations: ['recipient'],
    });

    return deliveries;
  }
}

export default DeliveryRepository;
