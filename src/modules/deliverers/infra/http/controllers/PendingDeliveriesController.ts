import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListPendingWithdrawalService from '@modules/deliverers/services/ListPendingWithdrawalService';

class PendingDeliveriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const deliverer_id = request.deliverer.id;

    const listPendingWithdrawal = container.resolve(
      ListPendingWithdrawalService,
    );

    const deliveries = await listPendingWithdrawal.execute(deliverer_id);

    return response.json(deliveries);
  }
}

export default PendingDeliveriesController;
