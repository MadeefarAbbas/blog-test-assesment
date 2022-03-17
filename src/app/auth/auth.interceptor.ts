import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export const BYPASS_LOG = new HttpContextToken(() => false);
@Injectable()


export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
      const authToken = this.authService.getToken();
      if (req.context.get(BYPASS_LOG) === true) {
        return next.handle(req);
      }
      const authRequest = req.clone({
          headers: req.headers.set("Authorization", "Token "+ authToken)
      });
      return next.handle(authRequest);
  }
}
