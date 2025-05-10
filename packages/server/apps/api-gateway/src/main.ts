import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  const configService = app.get(ConfigService);
  const API_GATEWAY_PORT = configService.get<number>('API_GATEWAY_PORT', 4000);
  const API_GATEWAY_PORT_2 = configService.get<number>('API_GATEWAY_PORT_2');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: API_GATEWAY_PORT_2,
    },
  });

  await app.startAllMicroservices();
  await app.listen(API_GATEWAY_PORT, '0.0.0.0');
}
bootstrap();
