import { Router } from 'express';

import recipientsRouter from '@modules/recipients/infra/http/routes/recipients.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import deliverersRouter from '@modules/deliverers/infra/http/routes/deliverers.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import deliveriesRouter from '@modules/deliveries/infra/http/routes/deliveries.routes';
import deliveryProblemsRouter from '@modules/deliveries/infra/http/routes/deliveryProblems.routes';
import verifyTokenRouter from './verifyToken.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/recipients', recipientsRouter);
routes.use('/users', usersRouter);
routes.use('/deliverers', deliverersRouter);
routes.use('/deliveries', deliveriesRouter);
routes.use('/delivery', deliveryProblemsRouter);

routes.use('/api/account', verifyTokenRouter);

export default routes;
