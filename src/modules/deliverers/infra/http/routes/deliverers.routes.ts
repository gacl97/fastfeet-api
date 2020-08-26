import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticate';
import ensureDelivererAuthenticate from '@modules/deliverers/infra/http/middlewares/ensureDelivererAuthenticate';

import DeliverersController from '@modules/deliverers/infra/http/controllers/DeliverersController';
import AvailableDeliveriesController from '@modules/deliverers/infra/http/controllers/AvailableDeliveriesController';
import PendingDeliveriesController from '@modules/deliverers/infra/http/controllers/PendingDeliveriesController';
import CompleteDeliveriesController from '@modules/deliverers/infra/http/controllers/CompleteDeliveriesController';
import DelivererAvatarController from '@modules/deliverers/infra/http/controllers/DelivererAvatarController';

const deliverersController = new DeliverersController();
const availableDeliveriesController = new AvailableDeliveriesController();
const pendingDeliveriesController = new PendingDeliveriesController();
const completeDeliveriesController = new CompleteDeliveriesController();
const delivererAvatarController = new DelivererAvatarController();

const deliverersRoutes = Router();
const upload = multer(uploadConfig);

// Rotas para usuarios
deliverersRoutes.put(
  '/delivery/:delivery_id',
  ensureDelivererAuthenticate,
  availableDeliveriesController.update,
);

deliverersRoutes.get(
  '/deliveries',
  ensureDelivererAuthenticate,
  availableDeliveriesController.index,
);

deliverersRoutes.get(
  '/pending',
  ensureDelivererAuthenticate,
  pendingDeliveriesController.index,
);

deliverersRoutes.get(
  '/delivery/:delivery_id',
  ensureDelivererAuthenticate,
  availableDeliveriesController.show,
);

deliverersRoutes.put(
  '/completeDeliveries/:delivery_id',
  ensureDelivererAuthenticate,
  completeDeliveriesController.update,
);

deliverersRoutes.get(
  '/completeDeliveries',
  ensureDelivererAuthenticate,
  completeDeliveriesController.index,
);

deliverersRoutes.get(
  '/:deliverer_id',
  ensureDelivererAuthenticate,
  deliverersController.show,
);

deliverersRoutes.patch(
  '/:deliverer_id/avatar',
  upload.single('avatar'),
  ensureDelivererAuthenticate,
  delivererAvatarController.update,
);

// Rotas para administradores
deliverersRoutes.use(ensureAuthenticate);

deliverersRoutes.post('/', deliverersController.create);
deliverersRoutes.put('/:id', deliverersController.update);
deliverersRoutes.get('/:deliverer_id', deliverersController.show);
deliverersRoutes.get('/', deliverersController.index);
deliverersRoutes.delete('/:deliverer_id', deliverersController.delete);
deliverersRoutes.patch(
  '/:deliverer_id/avatar',
  upload.single('avatar'),
  delivererAvatarController.update,
);

export default deliverersRoutes;
