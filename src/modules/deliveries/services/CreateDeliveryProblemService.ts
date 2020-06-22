import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDeliveryProblemsRepository from '../repositories/IDeliveryProblemsRepository';
import IDeliveriesRepository from '../repositories/IDeliveriesRepository';
import DeliveryProblem from '../infra/typeorm/entities/DeliveryProblem';

interface IRequestDTO {
  delivery_id: string;
  description: string;
}

@injectable()
class CreateDeliveryProblemService {
  constructor(
    @inject('DeliveryProblemsRepository')
    private deliveryProblems: IDeliveryProblemsRepository,

    @inject('DeliveriesRepository')
    private deliveriesRepository: IDeliveriesRepository,
  ) {}

  public async execute({
    delivery_id,
    description,
  }: IRequestDTO): Promise<DeliveryProblem> {
    const delivery = await this.deliveriesRepository.findById(delivery_id);

    if (!delivery) {
      throw new AppError('Delivery not found', 404);
    }

    const delivery_problem = await this.deliveryProblems.create({
      delivery_id,
      description,
    });

    return delivery_problem;
  }
}

export default CreateDeliveryProblemService;
