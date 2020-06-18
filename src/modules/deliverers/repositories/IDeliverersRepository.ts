import Deliverer from '@modules/deliverers/infra/typeorm/entities/Deliverer';

import ICreateDelivererDTO from '@modules/deliverers/dtos/ICreateDelivererDTO';

export default interface IDeliverersRepository {
  findByEmail(email: string): Promise<Deliverer | undefined>;
  create(data: ICreateDelivererDTO): Promise<Deliverer>;
  save(deliverer: Deliverer): Promise<Deliverer>;
  findById(id: string): Promise<Deliverer | undefined>;
  findAllDeliverers(): Promise<Deliverer[] | undefined>;
  deleteDeliverer(deliverer: Deliverer): Promise<void>;
}
