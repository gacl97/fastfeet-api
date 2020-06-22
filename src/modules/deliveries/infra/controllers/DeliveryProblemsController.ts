import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateDeliveryProblemService from '@modules/deliveries/services/CreateDeliveryProblemService';
import ListAllDeliveryProblemsService from '@modules/deliveries/services/ListAllDeliveryProblemsService';
import ListDeliveryProblemsService from '@modules/deliveries/services/ListDeliveryProblemsService';
import DeleteDeliveryProblemService from '@modules/deliveries/services/DeleteDeliveryProblemService';

class DeliveryProblemsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { delivery_id } = request.params;
    const { description } = request.body;

    const createDeliveryProblem = container.resolve(
      CreateDeliveryProblemService,
    );

    const deliveryProblem = await createDeliveryProblem.execute({
      delivery_id,
      description,
    });

    return response.json(deliveryProblem);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listAllDeliveryProblems = container.resolve(
      ListAllDeliveryProblemsService,
    );

    const deliveryProblems = await listAllDeliveryProblems.execute();

    return response.json(deliveryProblems);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { delivery_id } = request.params;

    const listDeliveryProblems = container.resolve(ListDeliveryProblemsService);

    const deliveryProblems = await listDeliveryProblems.execute(delivery_id);

    return response.json(deliveryProblems);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { delivery_id } = request.params;

    const deleteDeliveryProblem = container.resolve(
      DeleteDeliveryProblemService,
    );

    await deleteDeliveryProblem.execute(delivery_id);

    return response.status(200).json();
  }
}

export default DeliveryProblemsController;
