import {IPost} from "./IPost";

export interface IComments extends IPost{
  postId: number;
  name: string;
  email: string;
}
