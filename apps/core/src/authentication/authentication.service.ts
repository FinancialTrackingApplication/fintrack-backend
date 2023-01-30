import { Injectable } from '@nestjs/common'

import { MailingService } from '@libs/mailing'

@Injectable()
export class AuthenticationService {
  constructor(private mailingService: MailingService) {}

  async onApplicationBootstrap() {
    await this.mailingService.sendEmail({
      from: '"FinTrack" <financial.tracking.app@gmail.com>',
      to: ['"Gabriel" <gabrieldonnantuoni@gmail.com>', '"Proctux" <luiz.ado@hotmail.com>'],
      subject: 'Mailing test 🚀',
      text: '#VQV',
    })
  }
}
