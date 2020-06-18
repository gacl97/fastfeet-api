import { Router } from 'express';

import recipientsRouter from '@modules/recipients/infra/http/recipients.routes';
import usersRouter from '@modules/users/infra/http/users.routes';
import deliverersRouter from '@modules/deliverers/infra/http/deliverers.routes';
import deliveriesRouter from '@modules/deliveries/infra/http/deliveries.routes';

const routes = Router();

routes.use('/recipients', recipientsRouter);
routes.use('/users', usersRouter);
routes.use('/deliverers', deliverersRouter);
routes.use('/deliveries', deliveriesRouter);

export default routes;
