import { container } from 'tsyringe';

import '@modules/users/providers';

import RecipientRepository from '@modules/recipients/infra/typeorm/repositories/RecipientRepository';
import IRecipientRepository from '@modules/recipients/repositories/IRecipientRepository';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import DeliverersRepository from '@modules/deliverers/infra/typeorm/repositories/DelivererRepository';
import IDeliverersRepository from '@modules/deliverers/repositories/IDelivererRepository';

container.registerSingleton<IRecipientRepository>(
  'RecipientRepository',
  RecipientRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IDeliverersRepository>(
  'DeliverersRepository',
  DeliverersRepository,
);
