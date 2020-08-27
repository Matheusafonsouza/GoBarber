import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const userRouter = Router();

userRouter.post('/', async (request, response) => {
  try {
    const { name, password, email } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      password,
      email,
    });

    return response.status(200).json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default userRouter;
