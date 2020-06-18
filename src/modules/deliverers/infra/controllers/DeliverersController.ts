import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateDelivererService from '@modules/deliverers/services/CreateDelivererService';
import UpdateDelivererService from '@modules/deliverers/services/UpdateDelivererService';
import ListDeliverersService from '@modules/deliverers/services/ListDeliverersService';
import DeleteDelivererService from '@modules/deliverers/services/DeleteDelivererService';

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

    return response.json(deliverers);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { deliverer_id } = request.params;

    const deleteDeliverer = container.resolve(DeleteDelivererService);

    await deleteDeliverer.execute({ deliverer_id });

    return response.status(200).json();
  }
}
