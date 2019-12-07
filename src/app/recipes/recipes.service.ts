import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  readonly swapiURL:string = "https://swapi.co/api/people"
  constructor(private http: HttpClient) { }

  getPeople(){
    this.http.get(this.swapiURL).subscribe(people=>{
      console.log(people);
    })
  }
}
