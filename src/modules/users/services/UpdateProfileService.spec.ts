import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Matheus Afonso',
      email: 'matheus@email.com',
      password: '123123123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Matheus Marques',
      email: 'marques@email.com',
    });

    expect(updatedUser.name).toBe('Matheus Marques');
    expect(updatedUser.email).toBe('marques@email.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Bianca Marques',
      email: 'marques@email.com',
      password: '123123123',
    });

    const user = await fakeUsersRepository.create({
      name: 'Matheus Afonso',
      email: 'matheus@email.com',
      password: '123123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Matheus Marques',
        email: 'marques@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Matheus Afonso',
      email: 'matheus@email.com',
      password: '123123123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Matheus Marques',
      email: 'marques@email.com',
      old_password: '123123123',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Matheus Afonso',
      email: 'matheus@email.com',
      password: '123123123',
    });

    expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Matheus Marques',
        email: 'marques@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Matheus Afonso',
      email: 'matheus@email.com',
      password: '123123123',
    });

    expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Matheus Marques',
        email: 'marques@email.com',
        old_password: 'wrongpassword',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update from non-existing user', async () => {
    expect(
      updateProfile.execute({
        user_id: 'non-existing-user',
        name: 'Matheus Marques',
        email: 'marques@email.com',
        old_password: 'wrongpassword',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
