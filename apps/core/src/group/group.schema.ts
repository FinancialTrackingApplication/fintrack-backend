import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types as MongooseTypes, Document, Schema as MongooseSchema } from 'mongoose'

@Schema({ timestamps: true })
export class Group {
  _id: MongooseTypes.ObjectId

  @Prop({ required: true })
  name: string

  @Prop({ type: [MongooseSchema.Types.ObjectId] })
  userIds: MongooseTypes.ObjectId[]

  @Prop()
  budget: number

  createdAt: Date

  updatedAt: Date
}

export type GroupDocument = Group & Document

export const GroupSchema = SchemaFactory.createForClass(Group)
