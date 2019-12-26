import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  var port = process.env.PORT
  await app.listen(port);
}
bootstrap();
