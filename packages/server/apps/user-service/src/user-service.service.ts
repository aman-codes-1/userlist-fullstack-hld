import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from '@app/my-library/common/dto/create-user.dto';

@Injectable()
export class UserServiceService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<any[]> {
    const users = await this.userModel.find().sort({ createdAt: -1 }).lean();
    return users;
  }

  async findOneById(id: string): Promise<any> {
    try {
      const user = await this.userModel.findById(id).lean();
      if (!user) {
        throw new RpcException({
          statusCode: 400,
          error: 'Bad Request',
          message: 'User not found.',
        });
      }
      return user;
    } catch (err) {
      const { error: errorType, message } = err as {
        error: string;
        message: string | string[];
      };
      throw new RpcException({
        statusCode: 400,
        error: errorType,
        message,
      });
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new RpcException({
        statusCode: 400,
        error: 'Bad Request',
        message: 'User already exists.',
      });
    }
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  getHello(): string {
    return 'Hello World from User Microservice!';
  }
}
