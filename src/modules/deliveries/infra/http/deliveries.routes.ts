import { Router } from 'express';

import DeliveriesController from '../controllers/DeliveriesController';

const deliveriesController = new DeliveriesController();

const deliveriesRoutes = Router();

deliveriesRoutes.post('/', deliveriesController.create);
deliveriesRoutes.get('/', deliveriesController.index);
deliveriesRoutes.put('/:delivery_id', deliveriesController.update);
deliveriesRoutes.delete('/:delivery_id', deliveriesController.delete);

export default deliveriesRoutes;
