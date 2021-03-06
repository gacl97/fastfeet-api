import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateRecipientService from '@modules/recipients/services/CreateRecipientService';
import UpdateRecipientService from '@modules/recipients/services/UpdateRecipientService';
import ListAllRecipientsService from '@modules/recipients/services/ListAllRecipientsService';

class RecipientsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      street,
      number,
      complement,
      state,
      city,
      zipcode,
    } = request.body;

    const createRecipient = container.resolve(CreateRecipientService);

    const recipient = await createRecipient.execute({
      name,
      street,
      number,
      complement,
      state,
      city,
      zipcode,
    });

    return response.json(recipient);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      name,
      street,
      number,
      complement,
      state,
      city,
      zipcode,
    } = request.body;

    const updateRecipient = container.resolve(UpdateRecipientService);

    const recipient = await updateRecipient.execute({
      recipient_id: id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zipcode,
    });

    return response.json(recipient);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listAllRecipients = container.resolve(ListAllRecipientsService);

    const recipients = await listAllRecipients.execute();

    return response.json(recipients);
  }
}
export default RecipientsController;
