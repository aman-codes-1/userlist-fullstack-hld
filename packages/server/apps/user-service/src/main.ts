import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserServiceModule } from './user-service.module';

async function bootstrap() {
  const app = await NestFactory.create(UserServiceModule);
  const configService = app.get(ConfigService);
  const USER_SERVICE_PORT = configService.get<number>(
    'USER_SERVICE_PORT',
    4003,
  );
  const USER_SERVICE_HOST = configService.get<string>(
    'USER_SERVICE_HOST',
    '0.0.0.0',
  );
  const USER_SERVICE_REDIS_HOST = configService.get<string>(
    'USER_SERVICE_REDIS_HOST',
  );
  const USER_SERVICE_REDIS_PORT = configService.get<number>(
    'USER_SERVICE_REDIS_PORT',
  );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: USER_SERVICE_REDIS_HOST,
      port: USER_SERVICE_REDIS_PORT,
    },
  });

  await app.startAllMicroservices();
  await app.listen(USER_SERVICE_PORT, USER_SERVICE_HOST);
}
bootstrap();
