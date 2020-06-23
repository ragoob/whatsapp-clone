import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport, ClientKafka } from '@nestjs/microservices';
import { SocketService } from './services/socket.service';
import { Kafka } from 'kafkajs';
const KAFKA_BROKER = process.env.KAFKA_BROKER || "mybuild.centralus.cloudapp.azure.com:9092"

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HERO_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'ONE-TO-ONE-CHAT',
            brokers: [KAFKA_BROKER],
          },
          consumer: {
            groupId: 'one-to-one-service-consumer'
          }
        }
      },
    ]),
  ],
  controllers: [AppController],
  providers: [SocketService],
})
export class AppModule {}
