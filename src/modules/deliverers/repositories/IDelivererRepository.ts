import Deliverer from '@modules/deliverers/infra/typeorm/entities/Deliverer';

import ICreateDelivererDTO from '@modules/deliverers/dtos/ICreateDelivererDTO';

export default interface IDelivererRepository {
  findByEmail(email: string): Promise<Deliverer | undefined>;
  create(data: ICreateDelivererDTO): Promise<Deliverer>;
}
