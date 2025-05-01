import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppGatewayModule } from './app-gateway.module';
import { CustomValidationPipe } from './custom-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppGatewayModule);
  const configService = app.get(ConfigService);
  const APP_GATEWAY_PORT = configService.get<number>('APP_GATEWAY_PORT');
  const CLIENT_URL = configService.get<string>('CLIENT_URL');
  const ALLOWED_ORIGINS = configService.get<string>('ALLOWED_ORIGINS');
  const ALLOWED_ORIGIN_ARR = ALLOWED_ORIGINS
    ? (ALLOWED_ORIGINS?.includes?.(',') && ALLOWED_ORIGINS?.split?.(',')) ||
      ALLOWED_ORIGINS
    : undefined;
  const ORIGINS = [ALLOWED_ORIGIN_ARR, CLIENT_URL]
    .filter((origin) => origin)
    .flat(1);
  app.enableCors({
    origin: [...new Set(ORIGINS)],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  });
  app.useGlobalPipes(new CustomValidationPipe());
  await app.listen(APP_GATEWAY_PORT ?? 4001);
}
bootstrap();
