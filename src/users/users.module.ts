import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserFollow, UserFollowSchema } from './user-follow.schema'
import { User, UserSchema } from './user.schema'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: UserFollow.name,
        schema: UserFollowSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [MongooseModule, UsersService],
})
export class UsersModule {}
