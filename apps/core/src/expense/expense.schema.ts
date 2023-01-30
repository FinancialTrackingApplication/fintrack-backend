import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types as MongooseTypes, Schema as MongooseSchema, Document } from 'mongoose'

@Schema({ timestamps: true })
export class Expense {
  _id: MongooseTypes.ObjectId

  @Prop({ required: true })
  amount: number

  @Prop({ type: MongooseSchema.Types.ObjectId })
  transactionId?: MongooseTypes.ObjectId

  @Prop({ type: MongooseSchema.Types.ObjectId })
  categoryId?: MongooseTypes.ObjectId

  @Prop({ type: MongooseSchema.Types.ObjectId })
  userId: MongooseTypes.ObjectId

  createdAt: Date

  updatedAt: Date
}

export type ExpenseDocument = Expense & Document

export const ExpenseSchema = SchemaFactory.createForClass(Expense)
