import { Status } from '../constants/status';

export interface Password {
  passwordid: string;
  userid: string;
  password: string;
  active: Status;
  createddate: Date;
  modifieddate: Date;
}
