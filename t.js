const crypto = require('node:crypto')
const { Buffer } = require('node:buffer')
const { promisify } = require('node:util')
const pbkdf2Async = promisify(crypto.pbkdf2)

class PasswordService {
  saltLength = 64
  iterations = 1000
  keyLength = 256
  algorithm = 'sha512'
  saltInjectPosition = 7

  async hashPassword(password, salt) {
    if (!salt) {
      salt = crypto.randomBytes(this.saltLength).toString('hex')
    } else if (salt.toString('hex') !== salt || salt.length !== this.saltLength * 2) {
      throw new Error('Invalid salt')
    }
    const hashBuffer = await pbkdf2Async(password, salt, this.iterations, this.keyLength, this.algorithm)
    const hash = hashBuffer.toString('hex')
    return this.injectSaltOnBaseHash(hash, salt)
  }

  async isPasswordCorrect(hashPassword, passwordAttempt) {
    console.dir(hashPassword)
    const salt = this.extractSaltFromHash(hashPassword)
    const hashAttempt = await this.hashPassword(passwordAttempt, salt)
    return crypto.timingSafeEqual(Buffer.from(hashPassword), Buffer.from(hashAttempt))
  }

  injectSaltOnBaseHash(hash, salt) {
    return hash.replace(new RegExp(`^(.{${this.saltInjectPosition}}).{${this.saltLength * 2}}`), `$1${salt}`)
  }

  extractSaltFromHash(hash) {
    return hash.slice(this.saltInjectPosition, this.saltLength * 2 + this.saltInjectPosition)
  }
}

console.dir(crypto.generateKeySync('aes', { length: 256 }).export().toString('hex'))