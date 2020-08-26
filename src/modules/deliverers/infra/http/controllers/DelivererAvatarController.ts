import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateDelivererAvatarService from '@modules/deliverers/services/UpdateDelivererAvatarService';

class DelivererAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { deliverer_id } = request.params;

    const updateDelivererAvatar = container.resolve(
      UpdateDelivererAvatarService,
    );

    const deliverer = await updateDelivererAvatar.execute({
      deliverer_id,
      avatarFileName: request.file.filename,
    });

    return response.json(classToClass(deliverer));
  }
}

export default DelivererAvatarController;
