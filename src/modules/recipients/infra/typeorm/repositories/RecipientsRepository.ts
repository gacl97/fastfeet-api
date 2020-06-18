import { getRepository, Repository } from 'typeorm';

import IRecipientsRepository from '@modules/recipients/repositories/IRecipientsRepository';
import ICreateRecipientDTO from '@modules/recipients/dtos/ICreateRecipientDTO';
import Recipient from '../entities/Recipient';

class RecipientRepository implements IRecipientsRepository {
  private ormRepository: Repository<Recipient>;

  constructor() {
    this.ormRepository = getRepository(Recipient);
  }

  public async create({
    name,
    street,
    number,
    state,
    city,
    complement,
    zipcode,
  }: ICreateRecipientDTO): Promise<Recipient> {
    const recipient = this.ormRepository.create({
      name,
      street,
      number,
      state,
      city,
      complement,
      zipcode,
    });

    await this.ormRepository.save(recipient);

    return recipient;
  }

  public async findById(id: string): Promise<Recipient | undefined> {
    const recipient = await this.ormRepository.findOne(id);

    return recipient;
  }

  public async update(recipient: Recipient): Promise<Recipient> {
    this.ormRepository.save(recipient);

    return recipient;
  }
}

export default RecipientRepository;
