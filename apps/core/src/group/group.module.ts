import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { Group, GroupSchema } from './group.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }])],
  controllers: [],
  providers: [],
})
export class GroupModule {}
