import { Router } from 'express';

import RecipientsController from '../controllers/RecipientsControllers';

const recipientsController = new RecipientsController();

const recipientsRoutes = Router();

recipientsRoutes.post('/', recipientsController.create);
recipientsRoutes.put('/:id', recipientsController.update);
recipientsRoutes.get('/', recipientsController.index);

export default recipientsRoutes;
