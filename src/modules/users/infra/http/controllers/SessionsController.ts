import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password, role } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token, isAdmin } = await authenticateUser.execute({
      password,
      email,
      role,
    });

    return response.json({ user: classToClass(user), token, isAdmin });
  }
}

export default SessionsController;
