export type User = {
  id: number;
  mail: string;
};

export class UserEntity {
  users: User[] = [{ id: 1, mail: 'test@mail.ru' }];

  public getUser(): User {
    return this.users[0] as User;
  }
}
