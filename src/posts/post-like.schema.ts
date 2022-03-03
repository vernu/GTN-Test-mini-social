import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { User } from '../users/user.schema'
import { Post } from './post.schema'

export type PostLikeDocument = PostLike & Document

@Schema({ timestamps: true })
export class PostLike {
  _id?: Types.ObjectId
  @Prop({ type: Types.ObjectId, ref: 'User',  })
  user: User
  @Prop({ type: Types.ObjectId, ref: 'Post' })
  post: Post
}

export const PostLikeSchema = SchemaFactory.createForClass(PostLike)
