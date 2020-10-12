import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;

let listProvider: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProvider = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Matheus Afonso',
      email: 'matheus@email.com',
      password: '123123123',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Matheus Marques',
      email: 'marques@email.com',
      password: '123123123',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'loged user',
      email: 'logged@email.com',
      password: '123123123',
    });

    const providers = await listProvider.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
