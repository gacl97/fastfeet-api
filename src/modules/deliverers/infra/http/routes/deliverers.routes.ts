import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAthenticate';

import DeliverersController from '@modules/deliverers/infra/controllers/DeliverersController';
import AvailableDeliveriesController from '@modules/deliverers/infra/controllers/AvailableDeliveriesController';
import CompleteDeliveriesController from '@modules/deliverers/infra/controllers/CompleteDeliveriesController';
import DelivererAvatarController from '@modules/deliverers/infra/controllers/DelivererAvatarController';

const deliverersController = new DeliverersController();
const availableDeliveriesController = new AvailableDeliveriesController();
const completeDeliveriesController = new CompleteDeliveriesController();
const delivererAvatarController = new DelivererAvatarController();

const deliverersRoutes = Router();
const upload = multer(uploadConfig);

// Rotas para usuarios
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

// Rotas para administradores
deliverersRoutes.use(ensureAuthenticate);

deliverersRoutes.post('/', deliverersController.create);
deliverersRoutes.put('/:id', deliverersController.update);
deliverersRoutes.get('/', deliverersController.index);
deliverersRoutes.delete('/:deliverer_id', deliverersController.delete);
deliverersRoutes.patch(
  '/:deliverer_id/avatar',
  upload.single('avatar'),
  delivererAvatarController.update,
);

export default deliverersRoutes;
