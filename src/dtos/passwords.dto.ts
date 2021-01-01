import { Status } from '../constants/status';

export class CreatePasswordDto {
  public passwordid: string;

  public userid: string;

  public password: string;

  public active: Status;

  public createddate: Date;

  public modifieddate: Date;
}
