import { Router } from 'express';

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAthenticate';

import DeliveriesController from '@modules/deliveries/infra/controllers/DeliveriesController';

const deliveriesController = new DeliveriesController();

const deliveriesRoutes = Router();

deliveriesRoutes.use(ensureAuthenticate);
deliveriesRoutes.post('/', deliveriesController.create);
deliveriesRoutes.get('/', deliveriesController.index);
deliveriesRoutes.put('/:delivery_id', deliveriesController.update);
deliveriesRoutes.delete('/:delivery_id', deliveriesController.delete);

export default deliveriesRoutes;
