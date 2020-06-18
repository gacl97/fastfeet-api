import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Recipient from '../infra/typeorm/entities/Recipient';
import IRecipientsRepository from '../repositories/IRecipientsRepository';

interface IRequestDTO {
  recipient_id: string;
  name: string;
  street: string;
  number: string;
  complement: string;
  state: string;
  city: string;
  zipcode: string;
}

@injectable()
class UpdateRecipientService {
  constructor(
    @inject('RecipientsRepository')
    private recipientRepository: IRecipientsRepository,
  ) {}

  public async execute({
    recipient_id,
    name,
    street,
    number,
    complement,
    state,
    city,
    zipcode,
  }: IRequestDTO): Promise<Recipient> {
    const recipient = await this.recipientRepository.findById(recipient_id);

    if (!recipient) {
      throw new AppError('Recipient not found.', 404);
    }
    Object.assign(recipient, {
      name,
      street,
      number,
      complement,
      state,
      city,
      zipcode,
    });

    await this.recipientRepository.update(recipient);

    return recipient;
  }
}

export default UpdateRecipientService;
