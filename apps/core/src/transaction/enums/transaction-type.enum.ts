import { registerEnumType } from '@nestjs/graphql'

export enum TransactionType {
  INCOME = 'INCOME',
  OUTCOME = 'OUTCOME',
}

registerEnumType(TransactionType, { name: 'TransactionType' })
