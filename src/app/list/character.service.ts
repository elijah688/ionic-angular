import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Subject, Observable, throwError } from 'rxjs';
import { Character } from './character.model';
import { environment } from '../../environments/environment';
import { AlertService, AlertData } from '../alert/alert.service';
import { catchError } from 'rxjs/operators';

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
export class CharacterService {
  private _rickAndMortyApi:string = environment.rickAngMortyApi;
  private _characterSubject:Subject<Character[]> = new Subject<Character[]>();
  private _singleCharacterSubject:Subject<Character> = new Subject<Character>();
  
  constructor(
    private alertService: AlertService,
    private http: HttpClient) { }

  getCharacters(currentPage:number):void{
    this.http.get<rickAndMortyData>(`${this._rickAndMortyApi}/?page=${currentPage}`)
    .pipe(catchError(err=>this.handleRickAndMortiApiError(err)))
    .subscribe(characters=>{
      this._characterSubject.next((characters as rickAndMortyData).results);
    })
  }

  get characterSubject():Observable<Character[]>{
    return this._characterSubject.asObservable();
  }

 get singleCharacterSubject():Observable<Character>{
    return this._singleCharacterSubject.asObservable();
  }
  getCharacter(id:string):void{
    const rickAndMortyApi:string = environment.rickAngMortyApi;
    this.http.get<Character>(`${rickAndMortyApi}/${id}`)
    .pipe(catchError(err=>this.handleError(err)))
    .subscribe(character=>{
      this._singleCharacterSubject.next((character as Character));
    })
  }

  handleError(error:HttpErrorResponse):Observable<HttpErrorResponse>{
    let message:string;
    switch (error.status) {
      case 404:
        message = 'The character you are looking for doesn\'t exist.'        
        break;
      default:
        message = 'We\'re experiencing some technical difficulties.'
        break;
    }
    const data:AlertData = {
      header: "ERROR",
      subHeader: error.status.toString(),
      message: message,
    }
    this.alertService.presentNaavigateAlert(data);    
    return throwError(error);
  }

  handleRickAndMortiApiError(error:HttpErrorResponse):Observable<HttpErrorResponse>{
    const data:AlertData = {
      header: "ERROR",
      subHeader: error.status.toString(),
      message: 'The Rick \'N Morty API is currently unavailable' ,
    }
    this.alertService.presentAlert(data);    
    return throwError(error);
  }
}
