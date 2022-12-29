import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import configuration from './configuration'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      cache: true,
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class CustomConfigModule {}
