import { User } from './user.model';



export interface Community {

  _id: string;
  name: string;
  description: string;
  members: User[];

}
