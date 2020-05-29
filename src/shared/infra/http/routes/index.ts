import { Router } from 'express';

import recipientsRouter from '@modules/recipients/infra/http/recipients.routes';
import usersRouter from '@modules/users/infra/http/users.routes';

const routes = Router();

routes.use('/recipients', recipientsRouter);
routes.use('/users', usersRouter);

export default routes;
