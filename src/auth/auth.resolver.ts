import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInput, UserInput } from 'src/users/Input/users.input';
import { UsersModelGQL } from 'src/users/model/users.model';
import { AuthService } from './auth.service';
import { PubSub } from 'graphql-subscriptions';
const pubSub = new PubSub();

@Resolver(() => UsersModelGQL)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => UsersModelGQL)
  async signUp(@Args('payload') payload: UserInput) {
    const userData = await this.authService.signUp(payload);
    await pubSub.publish('userAdded', { userAdded: userData });
    return userData;
  }

  @Mutation(() => UsersModelGQL)
  async loginUser(@Args('payload') payload: LoginInput) {
    const userData = await this.authService.loginUser(payload);
    return userData;
  }
}
