import { Controller, OnModuleInit } from '@nestjs/common';
import {Kafka} from 'kafkajs'
import { SocketService } from './services/socket.service';
const KAFKA_BROKER = process.env.KAFKA_BROKER || "mybuild.centralus.cloudapp.azure.com:9092"

@Controller()
export class AppController implements OnModuleInit {
  dataStore : string[] = [];
  constructor(private socket : SocketService) {

  }
  async onModuleInit() {
    const kafka = new Kafka({
      clientId: 'ONE-TO-ONE-CHAT',
      brokers: [KAFKA_BROKER]
    })

    const producer = kafka.producer()

    const obj = {
      TemplateCode : this.newGuid(),
      ApplicationCode : "AMLRT",
      RequestedEmailDateTime : new Date(),
      RequestedSendDateTime : null,
      EmailParameters : JSON.stringify({
        MarketName : "Farma",
        Mold : "Mold 1",
        ApplicationName : "Mes Edge"
      }),

      Recipients : "Amohsen@integrant.com",
      EmailSubject : "Test dummy email",
      CcRecipients : "ahmed.mohsen.ext@aptar.com",
      BccRecipients : "ahmed.mohsen.ext@aptar.com;mohamed.ragab@integrant.com",
      SenderEmail : "mohamed.ragab@integrant.com",
      
    }

    await this.SendMessag("EMAIL_TOPIC",JSON.stringify(obj),producer);

    const consumer = kafka.consumer({ groupId: 'one-to-one-service-consumer'})
    await consumer.connect()
    await consumer.subscribe({ topic: 'Logger', fromBeginning: true });
   await this.getFromBeginning(consumer);
    this.socket.socket().on('connection', (socket) => {
      socket.on('getmessages', (data: any) => {
        this.dataStore.forEach(message=> {
          this.socket.emit("message",message.toString())
        })
      })
    });
  }
  
   async getFromBeginning( consumer){
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        this.dataStore.push(message.value.toString());
        console.log(this.dataStore)
        this.socket.emit("message",message.value.toString())
      },
    })
  }

  async SendMessag(topic : string , msg : string, producer){
    await producer.connect()
    await producer.send({
      topic: topic,
      messages: [
        { value: msg}
      ],
    })
  }

  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
