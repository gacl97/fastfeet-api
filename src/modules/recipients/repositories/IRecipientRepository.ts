import Recipient from '../infra/typeorm/entities/Recipient';

import ICreateRecipientDTO from '../dtos/ICreateRecipientDTO';

export default interface IRecipientRepository {
  create(data: ICreateRecipientDTO): Promise<Recipient>;
  update(data: ICreateRecipientDTO): Promise<Recipient>;
  findById(id: string): Promise<Recipient | undefined>;
}
