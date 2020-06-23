import { Component, OnInit } from '@angular/core';
import { SocketService } from './services/socket/socket.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  messages$ : BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  constructor(private socket : SocketService){

  }
  ngOnInit(): void {
    this.socket.emit('getmessages','test')
   this.socket.getmessages()
   .subscribe(d=> {
     let messages= this.messages$.value;
     messages.push(d);
     this.messages$.next(messages);
   });
  }
  title = 'app';
}
