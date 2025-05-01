import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { AppGatewayService } from './app-gateway.service';
import { CreateUserDto } from '@app/my-library/common/dto/create-user.dto';

@Controller()
export class AppGatewayController {
  constructor(
    @Inject('API_GATEWAY') private readonly apiGateway: ClientProxy,
    private readonly appGatewayService: AppGatewayService,
  ) {}

  @Get('users')
  async getUsers(): Promise<any[]> {
    try {
      const req = this.apiGateway.send<any[]>('get_users_req', {});
      const response = await firstValueFrom(req);
      return response;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  @Get('user/:id')
  async getUser(@Param('id') id: string): Promise<any> {
    try {
      const req = this.apiGateway.send<any[]>('get_user_req', id);
      const response = await firstValueFrom(req);
      return response;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  @Post('user')
  async createUser(@Body() dto: CreateUserDto): Promise<any> {
    try {
      const req = this.apiGateway
        .send<any[]>('post_create_user_req', dto)
        .pipe(timeout(5000));
      const response = await firstValueFrom(req);
      return response;
    } catch (err) {
      console.error('Error creating user:', err);
      throw err;
    }
  }

  @Get()
  getHello(): string {
    return this.appGatewayService.getHello();
  }
}
