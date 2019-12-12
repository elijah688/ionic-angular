import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { AlertService, AlertData } from '../alert/alert.service';


interface Token {
  idToken:string,
  email:string,
  refreshToken:string,
  expiresIn:string,
  localId:string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private signUpUrl:string = environment.signUpApi;
  private signInUrl:string = environment.loginInApi;
  private key:string = environment.authApiKey;
  private httpParams = new HttpParams().set('key', this.key);
  private autoLogOutTimer:ReturnType<typeof setTimeout>;

  constructor(
    private alertService:AlertService,
    private navCtrl:NavController, 
    private http:HttpClient) { }

  signUp(user:User):void{
    this.http.post<Token>(this.signUpUrl,user, {params:this.httpParams})
    .pipe(
      catchError(err=>this.handleError(err))
    ).subscribe(res=>{

      console.log(res);
      const data:AlertData = {
        header: "SUCCESS!",
        subHeader: "You've signed up.",
        message: `Your user name is: ${user.email}. You can now sign in.`,
      }

      this.alertService.presentAlert(data);
    })
  }

  signIn(user:User):any{
    this.http.post<Token>(this.signInUrl,user, {params:this.httpParams})
    .pipe(
      catchError(err=>this.handleError(err))
    ).subscribe(res=>{
      const token:Token = (res as Token);
      this.storeToken(token);
      this.autoLogOut();
      this.navCtrl.navigateForward(['/list']);
    })
  }

  handleError(error:HttpErrorResponse):Observable<HttpErrorResponse>{
    console.log(error);
    const data:AlertData = {
      header: "ERROR",
      subHeader: error.status.toString(),
      message: error.error.error.message,
    }
    this.alertService.presentAlert(data);
    return throwError(error);
  }

  storeToken(token:Token):void{
    const tokenId:string = token.idToken;
    const expiresIn:number = +token.expiresIn*1000;
    const now:number = new Date().getTime();
    const expirationTime:number = now + expiresIn;

    const expirationDate:Date = new Date(expirationTime);

    localStorage.setItem('token', tokenId);
    localStorage.setItem('currentUserId', token.localId);
    localStorage.setItem('expirationDate', JSON.stringify(expirationDate));
  }

  logOut():void{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('currentUserId');


    this.navCtrl.navigateBack(['/authentication'])

    clearTimeout(this.autoLogOutTimer); 
  }

  autoLogOut():void{
    const exp:string = localStorage.getItem('expirationDate')
    const expirationDate:Date = new Date(JSON.parse(exp));
    const expirationTime:number = (expirationDate.getTime());
    const now:number = new Date().getTime();

    const expiresIn:number = expirationTime - now;


    this.autoLogOutTimer = setTimeout(()=>{
      this.logOut();
    },expiresIn)
  }

  autoLogin():void{
    const token: string = localStorage.getItem('token');

    if(token){
      this.autoLogOut();
    }
  }


  
}
