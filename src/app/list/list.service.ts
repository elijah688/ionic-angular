import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Character } from './character.model';

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
  readonly swapiURL:string = "https://rickandmortyapi.com/api/character"
  private _recipeSubject:Subject<Character[]> = new Subject<Character[]>();
  constructor(private http: HttpClient) { }

  getRecipes():void{
    this.http.get<rickAndMortyData>(this.swapiURL).subscribe(recipes=>{
      this._recipeSubject.next(recipes.results);
    })
  }

  get recipesSubject():Observable<Character[]>{
    return this._recipeSubject.asObservable();
  }
}
