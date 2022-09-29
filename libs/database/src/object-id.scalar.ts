import { BadRequestException } from '@nestjs/common'
import { Scalar, CustomScalar, ID } from '@nestjs/graphql'
import { Kind, ValueNode } from 'graphql'
import { Types as MongooseTypes } from 'mongoose'

@Scalar('ID', () => ID)
export class ObjectIdScalar implements CustomScalar<string, MongooseTypes.ObjectId> {
  description = 'ObjectId custom scalar type'

  parseValue(value: unknown): MongooseTypes.ObjectId {
    if (typeof value !== 'string' || !MongooseTypes.ObjectId.isValid(value)) {
      throw new BadRequestException('Invalid id')
    }

    return new MongooseTypes.ObjectId(value)
  }

  serialize(value: MongooseTypes.ObjectId | string): string {
    return value.toString()
  }

  parseLiteral(ast: ValueNode): MongooseTypes.ObjectId {
    if (ast.kind === Kind.STRING) {
      return this.parseValue(ast.value)
    }
    throw new BadRequestException('Invalid id')
  }
}
