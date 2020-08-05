import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateDeliveryService from '@modules/deliveries/services/CreateDeliveryService';
import ListDeliveryService from '@modules/deliveries/services/ListDeliveryService';
import UpdateDeliveryService from '@modules/deliveries/services/UpdateDeliveryService';
import DeleteDeliveryService from '@modules/deliveries/services/DeleteDeliveryService';

class DeliveriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { product, deliveryman_id, recipient_id } = request.body;

    const createDelivery = container.resolve(CreateDeliveryService);

    const delivery = await createDelivery.execute({
      product,
      deliveryman_id,
      recipient_id,
    });

    return response.json(delivery);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listDeliveries = container.resolve(ListDeliveryService);

    const deliveries = await listDeliveries.execute();

    return response.json(classToClass(deliveries));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { delivery_id } = request.params;

    const { product, deliveryman_id, recipient_id } = request.body;

    const updateDelivery = container.resolve(UpdateDeliveryService);

    const delivery = await updateDelivery.execute({
      deliveryman_id,
      delivery_id,
      product,
      recipient_id,
    });

    return response.json(delivery);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { delivery_id } = request.params;

    const deleteDelivery = container.resolve(DeleteDeliveryService);

    await deleteDelivery.execute(delivery_id);

    return response.status(200).json();
  }
}

export default DeliveriesController;
