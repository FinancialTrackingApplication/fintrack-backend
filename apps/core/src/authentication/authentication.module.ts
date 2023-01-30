import { Module } from '@nestjs/common'

import { MailingModule } from '@libs/mailing'

import { AuthenticationService } from './authentication.service'

@Module({
  imports: [MailingModule],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
