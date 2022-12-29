import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import nodemailer, { Transporter, SendMailOptions } from 'nodemailer'

@Injectable()
export class MailingService {
  private transporter: Transporter

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'financial.tracking.app@gmail.com',
        pass: this.configService.get('google.mailing.appPassword'),
      },
    })
  }

  async onModuleInit() {
    const connectionSucceeded = await this.transporter.verify()
    if (!connectionSucceeded) {
      throw new InternalServerErrorException('Connection to mailing service failed.')
    }
  }

  async sendEmail(options: SendMailOptions) {
    await this.transporter.sendMail(options)
  }
}
