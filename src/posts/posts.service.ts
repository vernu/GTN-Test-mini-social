import { Inject, Injectable, Post, Scope } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { PostDocument } from './post.schema'
import { Model } from 'mongoose'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'

@Injectable({ scope: Scope.REQUEST })
export class PostsService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
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
}
