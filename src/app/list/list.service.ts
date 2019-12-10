import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Character } from './character.model';
import { environment } from './../../environments/environment';

interface rickAndMortyData {
  info:{
    count: number,
    next: string,
    pages: number,
    prev: string,
  },
  results:Character[] 
}

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private _rickAndMortyApi:string = environment.rickAngMortyApi;
  private _characterSubject:Subject<Character[]> = new Subject<Character[]>();
  constructor(private http: HttpClient) { }

  getCharacters():void{
    this.http.get<rickAndMortyData>(this._rickAndMortyApi).subscribe(characters=>{
      this._characterSubject.next(characters.results);
      this._rickAndMortyApi = characters.info.next;
      console.log(characters.info.next)
    })
  }

  get characterSubject():Observable<Character[]>{
    return this._characterSubject.asObservable();
  }
}
