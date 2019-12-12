import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token:string = localStorage.getItem('token');
    if(token && !req.url.includes(environment.rickAngMortyApi)){
      const clone = req.clone({
        setParams: {
          'auth' : token
      }
     });
      return next.handle(clone);
    }
    else{
      return next.handle(req);
    }
    
  }

}
