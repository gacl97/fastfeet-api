import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const usersController = new UsersController();

const usersRoutes = Router();

usersRoutes.post('/', usersController.create);
usersRoutes.put('/:id');

export default usersRoutes;
