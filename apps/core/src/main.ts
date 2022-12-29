/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import mongoose from 'mongoose'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = app.get(ConfigService<Record<string, string>, true>)

  const port = config.get('app.port')
  await app.listen(port)
  Logger.log(`🚀 Application is running on: ${await app.getUrl()}/graphql`)
  if (config.get('app.workspaceEnv') === 'development') {
    mongoose.set('debug', true)
  }
}

bootstrap()
