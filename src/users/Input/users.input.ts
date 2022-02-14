import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field(() => String)
  name: string;
  @Field(() => Int)
  age: number;
  @Field(() => String)
  email: string;
  @Field(() => String)
  password: string;
  @Field(() => String)
  role: string;
  @Field(() => String)
  technology: string;
}
@InputType()
export class LoginInput {
  @Field(() => String)
  email: string;
  @Field(() => String)
  password: string;
}
