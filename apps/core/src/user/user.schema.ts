import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types as MongooseTypes, Document, PreMiddlewareFunction } from 'mongoose'

@Schema({ timestamps: true })
export class User {
  _id: MongooseTypes.ObjectId

  @Prop({ required: true })
  firstName: string

  @Prop({ required: true })
  lastName: string

  @Prop({ required: true })
  fullName: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop()
  passwordUpdatedAt?: Date

  @Prop({ default: true })
  isActive: boolean

  @Prop({ default: false })
  emailVerified: boolean

  @Prop()
  emailVerificationLastRequestAt?: Date

  createdAt: Date

  updatedAt: Date
}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)

const setFullName: PreMiddlewareFunction<User> = function _(next) {
  this.fullName = `${this.firstName} ${this.lastName}`
  next()
}

UserSchema.pre('save', setFullName)
UserSchema.pre('insertMany', setFullName)
UserSchema.pre('updateOne', setFullName)
