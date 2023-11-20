import { User } from "./user.model";

export interface Post {
  _id: string;
  title: string;
  content: string;
  userId: string;
  likes: string[];
  author: User;
}
