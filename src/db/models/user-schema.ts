import { model, Schema } from 'mongoose';

export type UserEntity = {
  id: string;
  login: string;
  password: string;
};

const userSchema = new Schema({
  login: { type: String, required: true },
  password: { type: String, required: true },
});

export const User = model<UserEntity>('User', userSchema);
