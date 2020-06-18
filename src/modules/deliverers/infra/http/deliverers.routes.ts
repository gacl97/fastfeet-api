import { Router } from 'express';

import DeliverersController from '../controllers/DeliverersController';

const deliverersController = new DeliverersController();

const usersRoutes = Router();

usersRoutes.post('/', deliverersController.create);
usersRoutes.put('/:id', deliverersController.update);
usersRoutes.get('/', deliverersController.index);
usersRoutes.delete('/:deliverer_id', deliverersController.delete);

export default usersRoutes;
