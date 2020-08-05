import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateDelivererService from '@modules/deliverers/services/CreateDelivererService';
import UpdateDelivererService from '@modules/deliverers/services/UpdateDelivererService';
import ListDeliverersService from '@modules/deliverers/services/ListDeliverersService';
import DeleteDelivererService from '@modules/deliverers/services/DeleteDelivererService';
import ShowDelivererService from '@modules/deliverers/services/ShowDelivererService';

export default class DeliverersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createDeliverer = container.resolve(CreateDelivererService);

    const deliverer = await createDeliverer.execute({
      name,
      email,
    });

    return response.json(deliverer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email } = request.body;

    const updateDeliverer = container.resolve(UpdateDelivererService);

    const deliverer = await updateDeliverer.execute({
      id,
      name,
      email,
    });

    return response.json(deliverer);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listDeliverers = container.resolve(ListDeliverersService);

    const deliverers = await listDeliverers.execute();

    return response.json(classToClass(deliverers));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { deliverer_id } = request.params;

    const deleteDeliverer = container.resolve(DeleteDelivererService);

    await deleteDeliverer.execute({ deliverer_id });

    return response.status(200).json();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { deliverer_id } = request.params;

    const showDeliverer = container.resolve(ShowDelivererService);

    const {
      canceled_deliveries,
      created_at,
      deliveries_to_made,
      total_deliveries,
      total_deliveries_made,
      total_problem_deliveries,
    } = await showDeliverer.execute({ deliverer_id });

    return response.json({
      canceled_deliveries,
      created_at,
      deliveries_to_made,
      total_deliveries,
      total_deliveries_made,
      total_problem_deliveries,
    });
  }
}
