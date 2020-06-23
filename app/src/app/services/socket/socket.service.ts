import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { defer, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket;
  private connected = false;
  private readonly newMessage$: Observable<any>;

  constructor(
  ) {
    const socket = this.getSocket();
    
    this.newMessage$ = new Observable(observer => {
      socket.on('message', (data: any) => {
        observer.next(data);
      });
    });
  }

  
  getSocket(): any {
    const baseUrl = `localhost:4000`;
    this.socket = this.socket ? this.socket : io(baseUrl);
    return this.socket;
  }

  isConnected(): boolean {
    return this.connected;
  }



  emit(chanel: string,data : string){
    this.getSocket().emit(chanel,data);
  }
  getmessages(): Observable<any> {
    return this.newMessage$;
  }
}


