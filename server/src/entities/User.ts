import { IUser } from '../interfaces/types';

class User implements IUser {
  user_id: string;
  name: string;
  username: string;
  hashed_password: string;
  salt: string;
  profile_image: string | null;

  constructor(
    user_id: string,
    name: string,
    username: string,
    hashed_password: string,
    salt: string,
    profile_image: string | null
  ) {
    this.user_id = user_id;
    this.name = name;
    this.username = username;
    this.hashed_password = hashed_password;
    this.salt = salt;
    this.profile_image = profile_image;
  }

  public getUserId(): string {
    return this.user_id;
  }

  public getName(): string {
    return this.name;
  }

  public getUsername(): string {
    return this.username;
  }

  public getHashedPassword(): string {
    return this.hashed_password;
  }

  public getSalt(): string {
    return this.salt;
  }

  public getProfileImage(): string | null {
    return this.profile_image;
  }

  public validatePassword(password: string): boolean {
    return this.hashed_password === password + this.salt;
  }
}

export default User;
