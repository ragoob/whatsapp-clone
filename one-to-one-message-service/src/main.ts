import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Transport,MicroserviceOptions} from '@nestjs/microservices';
const KAFKA_BROKER = process.env.KAFKA_BROKER || "mybuild.centralus.cloudapp.azure.com:9092"

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [KAFKA_BROKER],
      }
    }
  });
  app.listen(() => console.log('Microservice is listening'));
}
bootstrap();



