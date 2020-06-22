import { inject, injectable } from 'tsyringe';
import IDeliveryProblemsRepository from '../repositories/IDeliveryProblemsRepository';
import DeliveryProblem from '../infra/typeorm/entities/DeliveryProblem';

@injectable()
class ListAllDeliveryProblemsService {
  constructor(
    @inject('DeliveryProblemsRepository')
    private deliveryProblemsRepository: IDeliveryProblemsRepository,
  ) {}

  public async execute(): Promise<DeliveryProblem[]> {
    const deliveryProblems = await this.deliveryProblemsRepository.findAllDeliveryProblems();

    return deliveryProblems;
  }
}

export default ListAllDeliveryProblemsService;
