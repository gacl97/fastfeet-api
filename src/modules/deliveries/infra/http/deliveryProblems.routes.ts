import { Router } from 'express';

import DeliveryProblemsController from '@modules/deliveries/infra/controllers/DeliveryProblemsController';

const deliveryProblemsController = new DeliveryProblemsController();

const deliveryProblemsRoutes = Router();

// Rota para entregador cadastrar
deliveryProblemsRoutes.post(
  '/:delivery_id/problems',
  deliveryProblemsController.create,
);

// Rota para administrador
deliveryProblemsRoutes.get('/problems', deliveryProblemsController.index);

// Rota de listagem para entregador
deliveryProblemsRoutes.get(
  '/:delivery_id/problems',
  deliveryProblemsController.show,
);

// Rota para adm cancelar uma entrega devido a gravidade de problema
deliveryProblemsRoutes.delete(
  '/:delivery_id/cancel-delivery',
  deliveryProblemsController.delete,
);

export default deliveryProblemsRoutes;
