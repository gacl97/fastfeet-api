import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateWithdrawalOrderEndService from '@modules/deliverers/services/UpdateWithdrawalOrderEndService';
import ListCompleteWithdrawalService from '@modules/deliverers/services/ListCompleteWithdrawalService';

class CompleteDeliveriesController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { deliverer_id, delivery_id } = request.params;

    const updateWithdrawalOrderEnd = container.resolve(
      UpdateWithdrawalOrderEndService,
    );

    const delivery = await updateWithdrawalOrderEnd.execute({
      deliverer_id,
      delivery_id,
    });

    return response.json(delivery);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { deliverer_id } = request.params;

    const listCompleteWithdrawal = container.resolve(
      ListCompleteWithdrawalService,
    );

    const complete_deliveries = await listCompleteWithdrawal.execute(
      deliverer_id,
    );

    return response.json(complete_deliveries);
  }
}

export default CompleteDeliveriesController;
