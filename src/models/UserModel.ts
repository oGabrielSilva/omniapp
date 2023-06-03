import { User } from '@prisma/client';

export class UserModel {
  constructor(
    public id: string,
    public email: string,
    public nickname: string,
    public name: string,
    public surname: string,
    public photoUrl: string,
    public bio: string,
    public activated: boolean
  ) {}

  public static from({ activated, bio, email, id, name, nickname, photoUrl, surname }: User) {
    return new UserModel(id, email, nickname, name, surname, photoUrl, bio, activated);
  }
}
