import { IsEmail } from 'class-validator';
import { Status } from '../constants/status';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  public accountname: string;

  public active: Status;

  public createddate: Date;

  public password: string;
}
