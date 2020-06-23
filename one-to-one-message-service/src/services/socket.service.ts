import { Injectable } from '@nestjs/common';
import * as socket from 'socket.io';

@Injectable()
export class SocketService {
  private io: socket.Server;
  private url = 'http://localhost:4000';

  constructor() {

    this.io = socket(4000);
  }

  emit(topic: string, message: any) {
    this.io.emit(topic, message);
  }

  socket() {
    return this.io;
  }

  
}
