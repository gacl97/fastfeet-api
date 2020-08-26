import { Router } from 'express';

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticate';
import RecipientsController from '@modules/recipients/infra/controllers/RecipientsControllers';

const recipientsController = new RecipientsController();

const recipientsRoutes = Router();

recipientsRoutes.use(ensureAuthenticate);

recipientsRoutes.post('/', recipientsController.create);
recipientsRoutes.put('/:id', recipientsController.update);
recipientsRoutes.get('/', recipientsController.index);

export default recipientsRoutes;
