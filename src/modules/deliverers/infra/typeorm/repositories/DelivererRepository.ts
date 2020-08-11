import { Repository, getRepository } from 'typeorm';

import Deliverer from '@modules/deliverers/infra/typeorm/entities/Deliverer';

import IDeliverersRepository from '@modules/deliverers/repositories/IDeliverersRepository';

import ICreateDelivererDTO from '@modules/deliverers/dtos/ICreateDelivererDTO';

class DelivererRepository implements IDeliverersRepository {
  private ormRepository: Repository<Deliverer>;

  constructor() {
    this.ormRepository = getRepository(Deliverer);
  }

  public async create({
    name,
    email,
    password,
  }: ICreateDelivererDTO): Promise<Deliverer> {
    const deliverer = this.ormRepository.create({
      name,
      email,
      password,
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

  public async save(deliverer: Deliverer): Promise<Deliverer> {
    await this.ormRepository.save(deliverer);

    return deliverer;
  }

  public async findById(id: string): Promise<Deliverer | undefined> {
    const deliverer = await this.ormRepository.findOne(id);

    return deliverer;
  }

  public async findAllDeliverers(): Promise<Deliverer[] | undefined> {
    const deliverers = await this.ormRepository.find();

    return deliverers;
  }

  public async deleteDeliverer(deliverer: Deliverer): Promise<void> {
    await this.ormRepository.remove(deliverer);
  }
}

export default DelivererRepository;
