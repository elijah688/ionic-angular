import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatMessage } from './message.model';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chatUrl:string =  environment.chatApi;
  private _messageSubject:Subject<ChatMessage[]> = new Subject<ChatMessage[]>()

  constructor(private http:HttpClient) { }

  getMessages():void{
    
    this.http.get<ChatMessage>(this.chatUrl).pipe(map(res=>{return Object.values(res)})).subscribe(res=>{
      this._messageSubject.next(res);
     
    })
  }

  sendMessage(message:ChatMessage):void{
    this.http.post<{name:string}>(this.chatUrl, message).subscribe(res=>{
      this.getMessages()
      console.log(res);
    });

  }

  get messageSubject():Observable<ChatMessage[]>{
    return this._messageSubject.asObservable();
  }
}
