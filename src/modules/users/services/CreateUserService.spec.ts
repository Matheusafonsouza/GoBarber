import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'matheus afonso',
      email: 'matheus@email.com',
      password: '123123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const userEmail = 'matheus@email.com';

    await createUser.execute({
      name: 'matheus afonso',
      email: userEmail,
      password: '123123123',
    });

    await expect(
      createUser.execute({
        name: 'matheus afonso',
        email: userEmail,
        password: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
