import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { User } from './user.schema'

export type UserFollowDocument = UserFollow & Document

@Schema({ timestamps: true })
export class UserFollow {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User
  @Prop({ type: Types.ObjectId, ref: 'User' })
  follower: User
}

export const UserFollowSchema = SchemaFactory.createForClass(UserFollow)
