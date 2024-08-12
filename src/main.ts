import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './response/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app
    .useGlobalPipes(
      new ValidationPipe({ whitelist: true, stopAtFirstError: true }),
    )
    .useGlobalInterceptors(new ResponseInterceptor());

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');
  await app.listen(PORT, () => {
    console.log(`Server Started Listening At ${PORT}`);
  });
}
bootstrap();
