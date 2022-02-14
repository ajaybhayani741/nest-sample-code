import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { usersSchema } from 'src/users/schema/users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'users', schema: usersSchema, collection: 'users' }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver,AuthService]
})
export class UsersModule { }
