export interface User{
  _id?: string;
  username:string;
  email: string;
  communaute: string;
  password: string;
  profilePicture:string;
  coverPicture:string;
  followers:string;
  following:string;
  isAdmin:boolean;
}
