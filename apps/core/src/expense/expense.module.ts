import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { Expense, ExpenseSchema } from './expense.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: Expense.name, schema: ExpenseSchema }])],
  controllers: [],
  providers: [],
})
export class ExpenseModule {}
