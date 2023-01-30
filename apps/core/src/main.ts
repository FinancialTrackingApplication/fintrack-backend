/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import mongoose from 'mongoose'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import cookie from '@fastify/cookie'
import helmet from '@fastify/helmet'
import csrfProtection from '@fastify/csrf-protection'
import cors from '@fastify/cors'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())

  const config = app.get(ConfigService<Record<string, string>, true>)

  await app.register(cors, config.get('cors'))
  await app.register(cookie, {
    secret: config.get('auth.cookieSecret'),
    parseOptions: { ...config.get('cookie.baseConfig'), httpOnly: true },
  })
  await app.register(helmet, { global: true })
  await app.register(csrfProtection, {
    cookieKey: '_csrf',
    cookieOpts: config.get('cookie.baseConfig'),
    getToken: req => req.headers[config.get('auth.antiCsrfHeader')] as string,
  })

  const port = config.get('app.port')
  await app.listen(port, '0.0.0.0')
  Logger.log(`Current WORKSPACE_ENV is ${config.get('app.workspaceEnv')}`)
  Logger.log(`🚀 Application is running on: ${await app.getUrl()}/graphql`)
  if (config.get('app.workspaceEnv') === 'development') {
    mongoose.set('debug', true)
  }
}

bootstrap()
