import { ObjectId } from 'bson';

export default interface IUser {
  _id?: ObjectId;
  name?: string;
  email?: string;
  password?: string;
  isActive?: boolean;
  isAdmin?: boolean;
}
