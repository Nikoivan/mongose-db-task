import { User, type UserEntity } from '../../../db/models/user-schema.js';
import type { CallBack } from '../domain.js';

const getUserById = async (id: string, cb: CallBack) => {
  process.nextTick(async () => {
    const user = await User.findById({ _id: id });

    if (!user) {
      throw new Error('User not found');
    }

    return cb(null, user);
  });
};

const getUserByLogin = async (login: string, cb: CallBack) => {
  process.nextTick(async () => {
    const user = await User.findOne({ login: login });

    if (user) {
      return cb(user);
    }

    return cb(null, null);
  });
};

const verifyPassword = (user: UserEntity, password: string) =>
  user.password === password;

const createUser = (user: UserEntity) =>
  User.create({ login: user.login, password: user.password });
export const userService = {
  getUserByLogin,
  getUserById,
  verifyPassword,
  createUser,
};
