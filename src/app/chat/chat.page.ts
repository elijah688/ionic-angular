import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.sass'],
})
export class ChatPage implements OnInit {
  message = {id:'AskvmppIPIn32', name:'Tom', sentAt:'1576049229', text:'Holla Baloo and How Di Doo...'}
  messages = [this.message,this.message,this.message]
  constructor() { }

  ngOnInit() {
  }

}
