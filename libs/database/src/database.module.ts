import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { ObjectIdScalar } from './object-id.scalar'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('database.url'),
      }),
    }),
  ],
  controllers: [],
  providers: [ObjectIdScalar],
  exports: [],
})
export class DatabaseModule {}
