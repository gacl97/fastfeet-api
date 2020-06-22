import { injectable, inject } from 'tsyringe';
import IRecipientsRepository from '../repositories/IRecipientsRepository';
import Recipient from '../infra/typeorm/entities/Recipient';

@injectable()
class ListAllRecipientsService {
  constructor(
    @inject('RecipientsRepository')
    private recipientsRepository: IRecipientsRepository,
  ) {}

  public async execute(): Promise<Recipient[]> {
    const recipients = await this.recipientsRepository.findAllRecipients();

    return recipients;
  }
}

export default ListAllRecipientsService;
