import { Status } from '../constants/status';

export interface User {
  userid: string;
  accountname: string;
  email: string;
  active: Status;
  createddate: Date;
}
