import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import configuration from '@app/my-library/config/configuration';
import { AppGatewayController } from './app-gateway.controller';
import { AppGatewayService } from './app-gateway.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      expandVariables: true,
    }),
    ClientsModule.registerAsync([
      {
        name: 'API_GATEWAY',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('API_GATEWAY_HOST'),
            port: configService.get<number>('API_GATEWAY_PORT_2'),
          },
        }),
      },
    ]),
  ],
  controllers: [AppGatewayController],
  providers: [AppGatewayService],
})
export class AppGatewayModule {}
