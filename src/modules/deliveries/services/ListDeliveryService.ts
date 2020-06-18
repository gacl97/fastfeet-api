import { inject, injectable } from 'tsyringe';
import IDeliveriesRepository from '../repositories/IDeliveriesRepository';
import Delivery from '../infra/typeorm/entities/Delivery';

@injectable()
class ListDeliveryService {
  constructor(
    @inject('DeliveriesRepository')
    private deliveryRepository: IDeliveriesRepository,
  ) {}

  public async execute(): Promise<Delivery[]> {
    const deliveries = await this.deliveryRepository.findAllDeliveries();

    return deliveries;
  }
}

export default ListDeliveryService;
