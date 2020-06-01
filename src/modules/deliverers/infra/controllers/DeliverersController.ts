import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateDelivererService from '@modules/deliverers/services/CreateDelivererService';
import UpdateDelivererService from '@modules/deliverers/services/UpdateDelivererService';

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
}
