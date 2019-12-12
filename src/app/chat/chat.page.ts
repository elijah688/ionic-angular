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
  private socketSub:Subscription = new Subscription();
  private currentUserId:string;

  constructor(
    private authServ:AuthenticationService,
    private db: AngularFireDatabase, 
    private chatServ:ChatService) { }

  ngOnInit() {
    this.chatServ.getMessages();
    this.chatServSub = this.chatServ.messageSubject.subscribe(messages=>{
      this.messages = messages;
    })
    this.socketSub = this.db.list('/messages').stateChanges().subscribe(res=>{
      this.chatServ.getMessages();
    })
    this.currentUserId = this.authServ.currentUserId;
    
  }

  sendMessage():void{
    const name:string = this.authServ.currentUserEmail;
    const content = this.messageContent;
    const date = new Date().getTime().toString();

    const creator:string = this.currentUserId;

    const message:ChatMessage = {name:name, content:content, date:date, creator:creator}
    this.chatServ.sendMessage(message);
  }

  ngOnDestroy(): void {
    this.chatServSub.unsubscribe();
    this.socketSub.unsubscribe();
  }
}
