import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;

let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Matheus Afonso',
      email: 'matheus@email.com',
      password: '123123123',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Matheus Afonso');
    expect(profile.email).toBe('matheus@email.com');
  });

  it('should be not be able show the profile from non-existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'nonexisting',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
