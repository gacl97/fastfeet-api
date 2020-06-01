import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateDelivererService from '@modules/deliverers/services/CreateDelivererService';

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
}
