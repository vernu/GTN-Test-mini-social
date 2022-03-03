import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './user.schema'
import { Model } from 'mongoose'
import * as bcrypt from 'bcryptjs'
import { UserFollow, UserFollowDocument } from './user-follow.schema'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(UserFollow.name)
    private userFollowModel: Model<UserFollowDocument>,
  ) {}

  async findOne(params) {
    return await this.userModel.findOne(params)
  }

  async findAll() {
    return await this.userModel.find()
  }

  async create(userData: any) {
    const { name, email, password } = userData
    if (await this.findOne({ email })) {
      throw new HttpException(
        'user exists with the same email',
        HttpStatus.BAD_REQUEST,
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
    })
    return await newUser.save()
  }

  async followUser(id: string, user: User) {
    const userToFollow = await this.userModel.findById(id)
    if (!userToFollow) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND)
    }
    const isFollowing = await this.userFollowModel.findOne({
      user: userToFollow._id,
      follower: user._id,
    })
    if (isFollowing) {
      throw new HttpException(
        'you are already following this user',
        HttpStatus.BAD_REQUEST,
      )
    }
    const follow = new this.userFollowModel({
      user: userToFollow,
      follower: user,
    })
    return await follow.save()
  }

  async unfollowUser(id: string, user: User) {
    const userToUnfollow = await this.userModel.findById(id)
    if (!userToUnfollow) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND)
    }
    const follow = await this.userFollowModel.findOne({
      user: userToUnfollow._id,
      follower: user._id,
    })
    if (!follow) {
      throw new HttpException(
        'you are not following this user',
        HttpStatus.BAD_REQUEST,
      )
    }
    return await follow.remove()
  }
}
