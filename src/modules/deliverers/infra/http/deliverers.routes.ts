import { Router } from 'express';

import DeliverersController from '../controllers/DeliverersController';
import AvailableDeliveriesController from '../controllers/AvailableDeliveriesController';
import CompleteDeliveriesController from '../controllers/CompleteDeliveriesController';

const deliverersController = new DeliverersController();
const availableDeliveriesController = new AvailableDeliveriesController();
const completeDeliveriesController = new CompleteDeliveriesController();

const deliverersRoutes = Router();

deliverersRoutes.post('/', deliverersController.create);
deliverersRoutes.put('/:id', deliverersController.update);
deliverersRoutes.get('/', deliverersController.index);
deliverersRoutes.delete('/:deliverer_id', deliverersController.delete);

deliverersRoutes.put(
  '/:deliverer_id/deliveries/:delivery_id',
  availableDeliveriesController.update,
);

deliverersRoutes.get(
  '/:deliverer_id/deliveries',
  availableDeliveriesController.index,
);

deliverersRoutes.put(
  '/:deliverer_id/completeDeliveries/:delivery_id',
  completeDeliveriesController.update,
);

deliverersRoutes.get(
  '/:deliverer_id/completeDeliveries',
  completeDeliveriesController.index,
);

export default deliverersRoutes;
