import crypto from 'node:crypto'
import { Buffer } from 'node:buffer'
import { promisify } from 'node:util'

import { ConfigService } from '@nestjs/config'

const pbkdf2Async = promisify(crypto.pbkdf2)

export class PasswordService {
  saltLength: number
  iterations: number
  keyLength: number
  algorithm: string
  saltInjectPosition: number

  constructor(private configService: ConfigService<Record<string, unknown>, true>) {
    this.saltLength = this.configService.get('passwordSettings.saltLength')
    this.iterations = this.configService.get('passwordSettings.iterations')
    this.keyLength = this.configService.get('passwordSettings.keyLength')
    this.algorithm = this.configService.get('passwordSettings.algorithm')
    this.saltInjectPosition = this.configService.get('passwordSettings.saltInjectPosition')
  }

  async hashPassword(password: string, salt?: string) {
    let validSalt = salt
    if (!validSalt) {
      validSalt = crypto.randomBytes(this.saltLength).toString('hex')
    } else if (!new RegExp(`^[0-9A-Fa-f]{${this.saltLength * 2}}$`).test(validSalt)) {
      throw new Error('Invalid salt')
    }
    const hashBuffer = await pbkdf2Async(
      password,
      validSalt,
      this.iterations,
      this.keyLength,
      this.algorithm,
    )
    const hash = hashBuffer.toString('hex')
    return this.injectSaltOnBaseHash(hash, validSalt)
  }

  async isPasswordCorrect(hashPassword: string, passwordAttempt: string) {
    const salt = this.extractSaltFromHash(hashPassword)
    const hashAttempt = await this.hashPassword(passwordAttempt, salt)
    return crypto.timingSafeEqual(Buffer.from(hashPassword), Buffer.from(hashAttempt))
  }

  private injectSaltOnBaseHash(hash: string, salt: string) {
    return hash.replace(
      new RegExp(`^(.{${this.saltInjectPosition}}).{${this.saltLength * 2}}`),
      `$1${salt}`,
    )
  }

  private extractSaltFromHash(hash: string) {
    return hash.slice(this.saltInjectPosition, this.saltLength * 2 + this.saltInjectPosition)
  }
}
