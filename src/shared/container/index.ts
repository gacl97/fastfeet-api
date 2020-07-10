import { container } from 'tsyringe';

import '@modules/users/providers'; // Provider de Hash de senha dos usuarios
import '@shared/container/providers'; // Todos os providers compartilhados

import RecipientsRepository from '@modules/recipients/infra/typeorm/repositories/RecipientsRepository';
import IRecipientsRepository from '@modules/recipients/repositories/IRecipientsRepository';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import DeliverersRepository from '@modules/deliverers/infra/typeorm/repositories/DelivererRepository';
import IDeliverersRepository from '@modules/deliverers/repositories/IDeliverersRepository';

import DeliveriesRepository from '@modules/deliveries/infra/typeorm/repositories/DeliveryRepository';
import IDeliveriesRepository from '@modules/deliveries/repositories/IDeliveriesRepository';

import DeliveryProblemsRepository from '@modules/deliveries/infra/typeorm/repositories/DeliveryProblemsRepository';
import IDeliveryProblemsRepository from '@modules/deliveries/repositories/IDeliveryProblemsRepository';

container.registerSingleton<IRecipientsRepository>(
  'RecipientsRepository',
  RecipientsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IDeliverersRepository>(
  'DeliverersRepository',
  DeliverersRepository,
);

container.registerSingleton<IDeliveriesRepository>(
  'DeliveriesRepository',
  DeliveriesRepository,
);

container.registerSingleton<IDeliveryProblemsRepository>(
  'DeliveryProblemsRepository',
  DeliveryProblemsRepository,
);
