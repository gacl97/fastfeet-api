import { Repository, getRepository } from 'typeorm';

import Deliverer from '@modules/deliverers/infra/typeorm/entities/Deliverer';

import IDelivererRepository from '@modules/deliverers/repositories/IDelivererRepository';

import ICreateDelivererDTO from '@modules/deliverers/dtos/ICreateDelivererDTO';

class DelivererRepository implements IDelivererRepository {
  private ormRepository: Repository<Deliverer>;

  constructor() {
    this.ormRepository = getRepository(Deliverer);
  }

  public async create({
    name,
    email,
  }: ICreateDelivererDTO): Promise<Deliverer> {
    const deliverer = this.ormRepository.create({
      name,
      email,
    });

    await this.ormRepository.save(deliverer);

    return deliverer;
  }

  public async findByEmail(email: string): Promise<Deliverer | undefined> {
    const deliverer = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return deliverer;
  }
}

export default DelivererRepository;