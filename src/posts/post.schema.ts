import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { User } from '../users/user.schema'

export type PostDocument = Post & Document

@Schema({ timestamps: true })
export class Post {
  _id?: Types.ObjectId
  @Prop({ type: String, required: true })
  title: string
  @Prop({ type: String, required: true })
  content: string
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User
  @Prop({ type: Number, default: 0 })
  likeCount: number
  @Prop({ type: Number, default: 0 })
  commentCount: number
}

export const PostSchema = SchemaFactory.createForClass(Post)
