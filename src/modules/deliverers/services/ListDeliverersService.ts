import { inject, injectable } from 'tsyringe';

import IDelivererRepository from '@modules/deliverers/repositories/IDelivererRepository';
import Deliverer from '../infra/typeorm/entities/Deliverer';

@injectable()
class ListDeliverersService {
  constructor(
    @inject('DeliverersRepository')
    private deliverersRepository: IDelivererRepository,
  ) {}

  public async execute(): Promise<Deliverer[] | undefined> {
    const deliverers = await this.deliverersRepository.findAllDeliverers();

    return deliverers;
  }
}

export default ListDeliverersService;
