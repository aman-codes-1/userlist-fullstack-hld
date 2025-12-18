import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { UserServiceService } from './user-service.service';
import { CreateUserDto } from '@app/my-library/common/dto/create-user.dto';

@Controller()
export class UserServiceController {
  constructor(private readonly userService: UserServiceService) {}

  @MessagePattern('get_users_req')
  async getUsers(): Promise<any[]> {
    const users = await this.userService.findAll();
    return users;
  }

  @MessagePattern('get_user_req')
  async getUser(@Payload() id: string): Promise<any> {
    const user = await this.userService.findOneById(id);
    return user;
  }

  @MessagePattern('post_create_user_req')
  async createUser(@Payload() dto: CreateUserDto) {
    const newUser = await this.userService.createUser(dto);
    return newUser;
  }

  @EventPattern('user_created_event')
  handleUserCreated(@Payload() user: { email: string }) {
    console.log(`User created: ${user.email}`);
  }

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }
}
