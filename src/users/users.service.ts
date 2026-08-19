import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserQuery } from './dtos/userQuery.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  // check if user subscription is valid
  async isSubscriptionValid(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user.subEnd > new Date();
  }

  // upgrade subscription by 1 month
  async upgradeSubscription(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const now = new Date();

    if (user.subEnd > now) {
      user.subEnd.setMonth(user.subEnd.getMonth() + 1);
    } else {
      user.subStart = now;

      const newEnd = new Date(now);
      newEnd.setMonth(newEnd.getMonth() + 1);

      user.subEnd = newEnd;
    }

    return await user.save();
  }

  async getUsers({
    page,
    take,
    gender,
    email,
  }: UserQuery): Promise<User[]> {
    const filter: any = {};

    if (gender) {
      filter.gender = {
        $regex: `^${gender}`,
        $options: 'i',
      };
    }

    if (email) {
      filter.email = {
        $regex: `^${email}`,
        $options: 'i',
      };
    }

    const skip = (page - 1) * take;

    return await this.userModel
      .find(filter)
      .skip(skip)
      .limit(take);
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({
      email: dto.email,
    });

    if (existingUser) {
      throw new BadRequestException('EMAIL ALREADY IN USE');
    }

    const now = new Date();

    const subEnd = new Date(now);
    subEnd.setMonth(subEnd.getMonth() + 1);

    const user = await this.userModel.create({
      ...dto,
      subStart: now,
      subEnd,
      expenses: [],
    });

    return user;
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async deleteUserById(userId: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return deletedUser;
  }

  async updateUserById(
    userId: string,
    dto: UpdateUserDto,
  ): Promise<User> {
    if (dto.email) {
      const existingUser = await this.userModel.findOne({
        email: dto.email,
        _id: { $ne: userId },
      });

      if (existingUser) {
        throw new BadRequestException('EMAIL ALREADY IN USE');
      }
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $set: dto,
      },
      {
        new: true,
      },
    );

    if (!updatedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return updatedUser;
  }
}