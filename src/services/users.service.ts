import { CreateUserDto } from '../dtos/users.dto';
import bcrypt from 'bcrypt';
import { User } from '../interfaces/user.interface';
import DB from '../database';
import HttpException from '../errors/HttpException';
import { CreatePasswordDto } from '../dtos/passwords.dto';
import { Status } from '../constants/status';

class UserService {
  public users = DB.Users;
  public password = DB.Passwords;
  public async findAllUser(): Promise<User[]> {
    const allUser: User[] = await this.users.findAll();
    return allUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    // if (is.isEmpty(userData)) throw new HttpException(400, "You're not userData");
    const findUser = await this.users.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const passwordData: CreatePasswordDto = new CreatePasswordDto();
    userData.active = Status.ACTIVE;
    userData.createddate = new Date();
    const createUserData: User = await this.users.create({ ...userData });
    passwordData.active = Status.ACTIVE;
    passwordData.userid = createUserData.userid;
    passwordData.password = hashedPassword;
    passwordData.createddate = new Date();
    passwordData.modifieddate = new Date();
    await this.password.create({ ...passwordData });
    return createUserData;
  }
}
export default UserService;
