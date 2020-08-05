import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateDeliverySignatureService from '@modules/deliveries/services/UpdateDeliverySignatureService';

class DeliverySignatureController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { delivery_id } = request.params;

    const updateDeliverySignature = container.resolve(
      UpdateDeliverySignatureService,
    );

    const delivery = await updateDeliverySignature.execute({
      delivery_id,
      signatureFileName: request.file.filename,
    });

    return response.json(delivery);
  }
}

export default DeliverySignatureController;
