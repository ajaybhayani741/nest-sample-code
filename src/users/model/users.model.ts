import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
// import { Document } from "mongoose";

@ObjectType()
export class UsersModelGQL {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  name?: string;

  @Field(() => String)
  email?: string;

  @Field(() => Int)
  age?: number;

  @Field(() => String)
  password?: string;

  @Field(() => String)
  role?: string;

  @Field(() => String)
  technology?: string;

  @Field(() => String, { nullable: true })
  token?: string;

  @Field(() => Boolean)
  status: boolean;
}
