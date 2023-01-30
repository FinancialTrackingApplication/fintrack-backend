import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types as MongooseTypes, Schema as MongooseSchema, Document } from 'mongoose'

import { TransactionType } from './enums'

@Schema({ timestamps: true })
export class Transaction {
  _id: MongooseTypes.ObjectId

  @Prop({ required: true })
  amount: number

  @Prop({ type: MongooseSchema.Types.String, enum: TransactionType, required: true })
  type: TransactionType

  @Prop()
  description?: string

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  groupId: MongooseTypes.ObjectId

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  createdByUserId: MongooseTypes.ObjectId

  createdAt: Date

  updatedAt: Date
}

export type TransactionDocument = Transaction & Document

export const TransactionSchema = SchemaFactory.createForClass(Transaction)
