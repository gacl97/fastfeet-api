import { Router } from 'express';

import DeliverersController from '../controllers/DeliverersController';
import AvailableDeliveriesController from '../controllers/AvailableDeliveriesController';

const deliverersController = new DeliverersController();
const availableDeliveriesController = new AvailableDeliveriesController();

const deliverersRoutes = Router();

deliverersRoutes.post('/', deliverersController.create);
deliverersRoutes.put('/:id', deliverersController.update);
deliverersRoutes.get('/', deliverersController.index);
deliverersRoutes.delete('/:deliverer_id', deliverersController.delete);

deliverersRoutes.put(
  '/:deliverer_id/deliveries/:delivery_id',
  availableDeliveriesController.update,
);

export default deliverersRoutes;
