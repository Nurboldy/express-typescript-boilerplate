import { CreateUserDto } from '../dtos/users.dto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../interfaces/user.interface';
import DB from '../database';
import HttpException from '../errors/HttpException';
import { DataStoredInToken, TokenData } from '../interfaces/auth.interface';

class AuthService {
  public users = DB.Users;
  public password = DB.Passwords;

  public async login(userData: CreateUserDto): Promise<{ cookie: string; findUser: User }> {
    // if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser = await this.users.findOne({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);
    const findPassword = await this.password.findOne({ where: { userid: findUser.userid } });
    if (!findPassword) throw new HttpException(409, `You're email ${userData.email} not found`);

    const isPasswordMatching: boolean = await bcrypt.compare(
      userData.password,
      findPassword.password,
    );
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.userid };
    const expiresIn: number = 60 * 60;
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, <string>process.env.JWT_SECRET, { expiresIn }),
    };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}
export default AuthService;
