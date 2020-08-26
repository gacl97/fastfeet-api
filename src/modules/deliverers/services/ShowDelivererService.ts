import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDeliverersRepository from '@modules/deliverers/repositories/IDeliverersRepository';
import IDeliveriesRepository from '@modules/deliveries/repositories/IDeliveriesRepository';
import IDeliveryProblemsRepository from '@modules/deliveries/repositories/IDeliveryProblemsRepository';

interface IRequestDTO {
  deliverer_id: string;
}

interface IResponseDTO {
  id: string;
  name: string;
  total_deliveries: number;
  total_deliveries_made: number;
  canceled_deliveries: number;
  deliveries_to_made: number;
  total_problem_deliveries: number;
  created_at: Date;
}

@injectable()
class ShowDelivererService {
  constructor(
    @inject('DeliverersRepository')
    private delivererRepository: IDeliverersRepository,
    @inject('DeliveriesRepository')
    private deliveryRepository: IDeliveriesRepository,
    @inject('DeliveryProblemsRepository')
    private deliveryProblems: IDeliveryProblemsRepository,
  ) {}

  public async execute({ deliverer_id }: IRequestDTO): Promise<IResponseDTO> {
    const deliverer = await this.delivererRepository.findById(deliverer_id);

    if (!deliverer) {
      throw new AppError('Deliverer not found', 404);
    }

    const deliveries = await this.deliveryRepository.findAllDeliveriesByDeliverer(
      deliverer_id,
    );

    const deliveryProblems = await this.deliveryProblems.findAllDeliveryProblemsById(
      deliverer.id,
    );

    const total_deliveries = deliveries.length;

    const total_deliveries_made = deliveries.filter(
      delivery => delivery.end_date && !delivery.canceled_at,
    ).length;

    const canceled_deliveries = deliveries.filter(
      delivery => !!delivery.canceled_at,
    ).length;

    const deliveries_to_made = deliveries.filter(delivery => {
      return !delivery.canceled_at && !delivery.end_date;
    }).length;

    const total_problem_deliveries = deliveryProblems.length;

    return {
      id: deliverer.id,
      name: deliverer.name,
      total_deliveries,
      total_deliveries_made,
      canceled_deliveries,
      deliveries_to_made,
      total_problem_deliveries,
      created_at: deliverer.created_at,
    };
  }
}

export default ShowDelivererService;
