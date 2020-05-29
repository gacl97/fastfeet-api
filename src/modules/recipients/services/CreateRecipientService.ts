import { inject, injectable } from 'tsyringe';

import IRecipientRepository from '../repositories/IRecipientRepository';
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
    @inject('RecipientRepository')
    private recipientRepository: IRecipientRepository,
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
