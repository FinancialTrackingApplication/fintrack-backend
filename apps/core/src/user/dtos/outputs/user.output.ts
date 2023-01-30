import { Field, ID, ObjectType, GraphQLISODateTime } from '@nestjs/graphql'

@ObjectType('User')
export class UserOutput {
  @Field(() => ID)
  _id: string

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  fullName: string

  @Field()
  email: string

  @Field(() => GraphQLISODateTime, { nullable: true })
  passwordUpdatedAt?: Date

  @Field()
  isActive: boolean

  @Field()
  emailVerified: boolean

  @Field(() => GraphQLISODateTime, { nullable: true })
  emailVerificationLastRequestAt?: Date

  @Field(() => GraphQLISODateTime)
  createdAt: Date

  @Field(() => GraphQLISODateTime)
  updatedAt: Date
}
