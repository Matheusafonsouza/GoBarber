import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import AppError from '../errors/AppError';
import uploadConfig from '../config/upload';
import User from '../models/User';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      const userAvatarpath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarpath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarpath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
