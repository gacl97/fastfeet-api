import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateWithdrawalOrderStartService from '@modules/deliverers/services/UpdateWithdrawalOrderStartService';
import ListAvailableWithdrawalService from '@modules/deliverers/services/ListAvailableWithdrawalService';

class AvailableDeliveriesController {
  public async update(request: Request, response: Response): Promise<Response> {
    const deliverer_id = request.deliverer.id;
    const { delivery_id } = request.params;

    const updateOrderWithdrawal = container.resolve(
      UpdateWithdrawalOrderStartService,
    );

    const delivery = await updateOrderWithdrawal.execute({
      deliverer_id,
      delivery_id,
    });

    return response.json(delivery);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const deliverer_id = request.deliverer.id;

    const listAvailableWithdrawal = container.resolve(
      ListAvailableWithdrawalService,
    );

    const deliveries = await listAvailableWithdrawal.execute(deliverer_id);

    return response.json(deliveries);
  }
}

export default AvailableDeliveriesController;
