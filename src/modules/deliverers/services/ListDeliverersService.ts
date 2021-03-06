import { inject, injectable } from 'tsyringe';

import IDeliverersRepository from '@modules/deliverers/repositories/IDeliverersRepository';
import Deliverer from '../infra/typeorm/entities/Deliverer';

@injectable()
class ListDeliverersService {
  constructor(
    @inject('DeliverersRepository')
    private deliverersRepository: IDeliverersRepository,
  ) {}

  public async execute(): Promise<Deliverer[] | undefined> {
    const deliverers = await this.deliverersRepository.findAllDeliverers();

    return deliverers;
  }
}

export default ListDeliverersService;
