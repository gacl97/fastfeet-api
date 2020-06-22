import { getRepository, Repository } from 'typeorm';

import ICreateDeliveryProblemDTO from '@modules/deliveries/dtos/ICreateDeliveryProblemDTO';

import IDeliveryProblemsRepository from '@modules/deliveries/repositories/IDeliveryProblemsRepository';
import DeliveryProblem from '../entities/DeliveryProblem';

class DeliveryProblemsRepository implements IDeliveryProblemsRepository {
  private ormRepository: Repository<DeliveryProblem>;

  constructor() {
    this.ormRepository = getRepository(DeliveryProblem);
  }

  public async create({
    delivery_id,
    description,
  }: ICreateDeliveryProblemDTO): Promise<DeliveryProblem> {
    const deliveryProblem = this.ormRepository.create({
      delivery_id,
      description,
    });

    await this.ormRepository.save(deliveryProblem);

    return deliveryProblem;
  }

  public async findAllDeliveryProblemsById(
    delivery_id: string,
  ): Promise<DeliveryProblem[]> {
    const deliveryProblems = await this.ormRepository.find({
      where: {
        delivery_id,
      },
    });

    return deliveryProblems;
  }

  public async findAllDeliveryProblems(): Promise<DeliveryProblem[]> {
    const deliveryProblems = await this.ormRepository.find();

    return deliveryProblems;
  }

  public async findById(
    delivery_id: string,
  ): Promise<DeliveryProblem | undefined> {
    const deliveryProblem = await this.ormRepository.findOne(delivery_id);

    return deliveryProblem;
  }
}

export default DeliveryProblemsRepository;
