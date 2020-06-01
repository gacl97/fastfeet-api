import { Router } from 'express';

import DeliverersController from '../controllers/DeliverersController';

const deliverersController = new DeliverersController();

const usersRoutes = Router();

usersRoutes.post('/', deliverersController.create);
usersRoutes.put('/:id', deliverersController.update);

export default usersRoutes;
