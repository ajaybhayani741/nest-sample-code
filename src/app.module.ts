import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Upload } from './users/scalar/user.scalar';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost/graphql'),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers:true,
      sortSchema: true,
      playground: true,
      debug: false,
      context: ({ req }) => {
        return {
          request: req,
        };
      },
    }),
    AuthModule
  ],
  controllers: [AppController, UsersController],
  providers: [AppService,Upload],
})
export class AppModule {}
