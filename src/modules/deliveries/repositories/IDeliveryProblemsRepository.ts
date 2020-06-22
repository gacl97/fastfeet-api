import ICreateDeliveryProblemDTO from '@modules/deliveries/dtos/ICreateDeliveryProblemDTO';
import DeliveryProblem from '../infra/typeorm/entities/DeliveryProblem';

export default interface IDeliveryProblemsRepository {
  create(data: ICreateDeliveryProblemDTO): Promise<DeliveryProblem>;
  findAllDeliveryProblemsById(delivery_id: string): Promise<DeliveryProblem[]>;
  findAllDeliveryProblems(): Promise<DeliveryProblem[]>;
  findById(delivery_id: string): Promise<DeliveryProblem | undefined>;
}
