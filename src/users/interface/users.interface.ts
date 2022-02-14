import { Document } from 'mongoose';

export interface Users extends Document {
  name: string;
  age: number;
  email: string;
  password: string;
  role: string;
  technology: string;
  token: string;
  status: string;
}
