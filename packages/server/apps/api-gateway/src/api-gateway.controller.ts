import { Body, Controller, Get, Inject } from '@nestjs/common';
import {
  ClientProxy,
  MessagePattern,
  Payload,
  RpcException,
} from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { ApiGatewayService } from './api-gateway.service';
import { CreateUserDto } from '@app/my-library/common/dto/create-user.dto';

@Controller()
export class ApiGatewayController {
  constructor(
    @Inject('USER_SERVICE') private userService: ClientProxy,
    private readonly apiGatewayService: ApiGatewayService,
  ) {}

  @MessagePattern('get_users_req')
  async getUsers(@Payload() data: any): Promise<any[]> {
    const req = this.userService
      .send<any[]>('get_users_req', data)
      .pipe(timeout(5000));
    const result = await firstValueFrom(req);
    return result;
  }

  @MessagePattern('get_user_req')
  async getUser(@Payload() data: string): Promise<any> {
    try {
      const req = this.userService
        .send<any[]>('get_user_req', data)
        .pipe(timeout(5000));
      const result = await firstValueFrom(req);
      return result;
    } catch (err) {
      const {
        statusCode,
        error: errorType,
        message,
      } = err as {
        statusCode: number;
        error: string;
        message: string | string[];
      };
      throw new RpcException({
        statusCode,
        error: errorType,
        message,
      });
    }
  }

  @MessagePattern('post_create_user_req')
  async createUser(@Body() dto: CreateUserDto): Promise<any> {
    try {
      const req = this.userService
        .send<any[]>('post_create_user_req', dto)
        .pipe(timeout(5000));
      const user = await firstValueFrom(req);
      this.userService.emit('user_created_event', user);
      return user;
    } catch (err) {
      const {
        statusCode,
        error: errorType,
        message,
      } = err as {
        statusCode: number;
        error: string;
        message: string | string[];
      };
      throw new RpcException({
        statusCode,
        error: errorType,
        message,
      });
    }
  }

  @Get()
  getHello(): string {
    return this.apiGatewayService.getHello();
  }
}
