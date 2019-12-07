import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Recipe } from './recipes.model';
import { Subject, Observable } from 'rxjs';

interface rickAndMortyData {
  info:{
    count: number,
    next: string,
    pages: number,
    prev: string,
  },
  results:Recipe[] 
}

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  readonly swapiURL:string = "https://rickandmortyapi.com/api/character"
  private _recipeSubject:Subject<Recipe[]> = new Subject<Recipe[]>();
  constructor(private http: HttpClient) { }

  getRecipes():void{
    this.http.get<rickAndMortyData>(this.swapiURL).subscribe(recipes=>{
      this._recipeSubject.next(recipes.results);
    })
  }

  get recipesSubject():Observable<Recipe[]>{
    return this._recipeSubject.asObservable();
  }
}
