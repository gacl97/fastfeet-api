import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticate';

import DeliveriesController from '@modules/deliveries/infra/controllers/DeliveriesController';
import DeliverySignatureController from '@modules/deliveries/infra/controllers/DeliverySignatureController';
import ensureDelivererAuthenticate from '@modules/deliverers/infra/http/middlewares/ensureDelivererAuthenticate';

const deliveriesController = new DeliveriesController();
const deliverySignatureController = new DeliverySignatureController();

const deliveriesRoutes = Router();
const upload = multer(uploadConfig);

deliveriesRoutes.patch(
  '/:delivery_id/signature',
  upload.single('signature'),
  ensureDelivererAuthenticate,
  deliverySignatureController.update,
);

deliveriesRoutes.use(ensureAuthenticate);
deliveriesRoutes.post('/', deliveriesController.create);
deliveriesRoutes.get('/', deliveriesController.index);
deliveriesRoutes.put('/:delivery_id', deliveriesController.update);
deliveriesRoutes.delete('/:delivery_id', deliveriesController.delete);

export default deliveriesRoutes;
