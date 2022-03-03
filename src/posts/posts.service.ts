import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Scope,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { PostDocument } from './post.schema'
import { Model } from 'mongoose'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { Post } from './post.schema'
import { PostLike } from './post-like.schema'
import { UsersService } from 'src/users/users.service'
import { User } from 'src/users/user.schema'

@Injectable({ scope: Scope.REQUEST })
export class PostsService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(PostLike.name) private postLikeModel: Model<PostLike>,
    private usersService: UsersService,
  ) {}
  async findAll() {
    return await this.postModel.find()
  }

  async create(postData: any) {
    const { title, content } = postData
    const newPost = new this.postModel({
      title,
      content,
      user: this.request.user,
    })
    return await newPost.save()
  }

  async findOne(params) {
    return await this.postModel.findOne(params)
  }

  async like(id: string, user: User) {
    const post = await this.postModel.findById(id)
    const alreadyLiked = await this.postLikeModel.findOne({
      user: user._id,
      post: post._id,
    })
    if (alreadyLiked) {
      throw new HttpException(
        'You already liked this post',
        HttpStatus.BAD_REQUEST,
      )
    } else {
      console.log(user._id)
      const newLike = new this.postLikeModel({
        user,
        post,
      })
      post.likeCount += 1
      return await newLike.save()
    }
  }

  async unlike(id: string, user: User) {
    const post = await this.postModel.findById(id)

    const alreadyLiked = await this.postLikeModel.findOne({
      user: user._id,
      post: post._id,
    })
    if (alreadyLiked) {
      post.likeCount -= 1
      return await alreadyLiked.remove()
    } else {
      throw new HttpException(
        'You did not like this post',
        HttpStatus.BAD_REQUEST,
      )
    }
  }
}
