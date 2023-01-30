import { Module } from '@nestjs/common'
// import { ApolloDriverAsyncConfig } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'

import { DatabaseModule } from '@libs/database'

import { CustomConfigModule } from './config/config.module'
import { AuthenticationModule } from './authentication/authentication.module'

@Module({
  imports: [
    DatabaseModule,
    CustomConfigModule,
    AuthenticationModule,
    GraphQLModule.forRootAsync({
      // TODO: Create a custom @nestjs/apollo lib that doesn't use the old fastify-apollo-server
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
