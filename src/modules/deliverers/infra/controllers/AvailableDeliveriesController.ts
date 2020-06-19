import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateWithdrawalOrderStart from '@modules/deliverers/services/UpdateWithdrawalOrderStart';

class AvailableDeliveriesController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { deliverer_id, delivery_id } = request.params;

    const updateOrderWithdrawal = container.resolve(UpdateWithdrawalOrderStart);

    await updateOrderWithdrawal.execute({
      deliverer_id,
      delivery_id,
    });

    return response.status(200).json();
  }
}

export default AvailableDeliveriesController;
