import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private auth: AuthService) { }

  intercept(req: any, next: any) {
    const tokenReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.auth.getToken()
      }
    })
    return next.handle(tokenReq);
  }
}

