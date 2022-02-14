import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Schema } from 'mongoose';
import { UsersModelGQL } from 'src/users/model/users.model';
import { UserInput } from './Input/users.input';
import { UsersService } from './users.service';
import { FileUpload } from 'graphql-upload';
import { GraphQLUpload } from 'apollo-server-express';
import { createWriteStream } from 'fs';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/Util/roles.guard';
import { Roles } from 'src/auth/Util/role.decoretor';
import { GqlAuthGuard } from 'src/auth/Util/auth.guard';
import { AppRoles } from '../constant';
const pubSub = new PubSub();

@Resolver(() => UsersModelGQL)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [UsersModelGQL])
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Query(() => UsersModelGQL)
  async getUserById(
    @Args('_id', { type: () => String }) _id: Schema.Types.ObjectId,
  ) {
    return await this.usersService.getUserById(_id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(AppRoles.MANAGEMENT, AppRoles.PROJECT_MANAGER)
  @Mutation(() => UsersModelGQL)
  async addUser(@Args('payload') payload: UserInput) {
    console.log('hello');
    const userData = await this.usersService.addUser(payload);
    await pubSub.publish('userAdded', { userAdded: userData });
    return userData;
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(AppRoles.MANAGEMENT, AppRoles.PROJECT_MANAGER)
  @Mutation(() => UsersModelGQL)
  async deleteUser(
    @Args('_id', { type: () => String }) _id: Schema.Types.ObjectId,
  ) {
    const userData = await this.usersService.deleteUser(_id);
    await pubSub.publish('userAdded', { userAdded: userData });
    return userData;
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(AppRoles.MANAGEMENT, AppRoles.PROJECT_MANAGER)
  @Mutation(() => UsersModelGQL)
  async editUser(
    @Args('payload') payload: UserInput,
    @Args('_id', { type: () => String }) _id: Schema.Types.ObjectId,
  ) {
    //@Args('_id', { type: () => String }) _id: Schema.Types.ObjectId
    const userData = await this.usersService.editUser(payload, _id);
    await pubSub.publish('userAdded', { userAdded: userData });
    return userData;
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(AppRoles.MANAGEMENT, AppRoles.PROJECT_MANAGER)
  @Mutation(() => Boolean)
  async fileUpload(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload,
  ): Promise<boolean> {
    console.log('filename :>> ', filename);

    const userImage: any = new Promise(async (resolve, reject) => {
      createReadStream()
        .pipe(createWriteStream(`./upload/${filename}`))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false));
    });
    await pubSub.publish('userAdded', { userAdded: userImage });
    return userImage;
  }

  @Subscription(() => UsersModelGQL, { name: 'userAdded' })
  async userAddedHandler() {
    return pubSub.asyncIterator('userAdded');
  }
}
