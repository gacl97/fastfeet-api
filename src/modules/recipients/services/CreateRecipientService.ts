import { inject, injectable } from 'tsyringe';

import IRecipientsRepository from '../repositories/IRecipientsRepository';
import Recipient from '../infra/typeorm/entities/Recipient';

interface IRequestDTO {
  name: string;
  street: string;
  number: string;
  complement: string;
  state: string;
  city: string;
  zipcode: string;
}

@injectable()
class CreateRecipientService {
  constructor(
    @inject('RecipientsRepository')
    private recipientRepository: IRecipientsRepository,
  ) {}

  public async execute({
    name,
    street,
    number,
    complement,
    state,
    city,
    zipcode,
  }: IRequestDTO): Promise<Recipient> {
    const recipient = await this.recipientRepository.create({
      name,
      street,
      number,
      complement,
      state,
      city,
      zipcode,
    });

    return recipient;
  }
}

export default CreateRecipientService;
