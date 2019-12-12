import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatMessage } from './message.model';
import { ChatService } from './chat.service';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.sass'],
})
export class ChatPage implements OnInit, OnDestroy {
  
  private messages:ChatMessage[] = [];
  private messageContent:string;
  private chatServSub:Subscription = new Subscription();

  constructor(
    private db: AngularFireDatabase, 
    private authServ:AuthenticationService,
    private chatServ:ChatService) { }

  ngOnInit() {
    this.chatServ.getMessages();
    this.chatServSub = this.chatServ.messageSubject.subscribe(messages=>{
      this.messages = messages;
    })
    this.db.list('/messages').stateChanges().subscribe(res=>{
      this.chatServ.getMessages();
    })
  }

  sendMessage():void{
    const name:string = 'Name'
    const content = this.messageContent;
    const date = new Date().getTime().toString();

    const creator:string = localStorage.getItem('currentUser');

    const message:ChatMessage = {name:name, content:content, date:date, creator:creator}
    this.chatServ.sendMessage(message);
  }

  ngOnDestroy(): void {
    this.chatServSub.unsubscribe();
  }
}
