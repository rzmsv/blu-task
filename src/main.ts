import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfigs } from './configs';
import { ValidationPipe } from '@nestjs/common';
import { ErrorFilter } from './core/interceptors/error/error-handling.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.useGlobalFilters(new ErrorFilter());
  const port = appConfigs.APP_PORT || 3000
  await app.listen(port, () => {
    console.log(`APP on port ${port}...`)
  });
}
bootstrap();
