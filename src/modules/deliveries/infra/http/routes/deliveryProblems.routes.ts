import { Router } from 'express';

import DeliveryProblemsController from '@modules/deliveries/infra/controllers/DeliveryProblemsController';
import ensureAthenticate from '@modules/users/infra/http/middlewares/ensureAthenticate';
import ensureDelivererAuthenticate from '@modules/deliverers/infra/http/middlewares/ensureDelivererAuthenticate';

const deliveryProblemsController = new DeliveryProblemsController();

const deliveryProblemsRoutes = Router();

// Rota para entregador cadastrar
deliveryProblemsRoutes.post(
  '/:delivery_id/problems',
  ensureDelivererAuthenticate,
  deliveryProblemsController.create,
);

// Rota de listagem para entregador
deliveryProblemsRoutes.get(
  '/:delivery_id/problems',
  ensureDelivererAuthenticate,
  deliveryProblemsController.show,
);

// Daqui pra baixo somente rotas autenticadas para adminstrador
deliveryProblemsRoutes.use(ensureAthenticate);

// Rota para administrador
deliveryProblemsRoutes.get('/problems', deliveryProblemsController.index);

// Rota para adm cancelar uma entrega devido a gravidade de problema
deliveryProblemsRoutes.delete(
  '/:delivery_id/cancel-delivery',
  deliveryProblemsController.delete,
);

export default deliveryProblemsRoutes;
