import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from './user.model';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private token!: string | null;
  private authStatusListener = new BehaviorSubject<boolean>(false);
  private loginErrors = new BehaviorSubject<String[]>([]);
  private registerErrors = new BehaviorSubject<String[]>([]);

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getLoginErrors() {
    return this.loginErrors.asObservable();
  }

  getRegisterErrors() {
    return this.registerErrors.asObservable();
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  register(username: string, email: string, password: string) {
    const registerUser = {username, email, password};
    this.http.post<{user: User}>(BACKEND_URL + "/users", {user: registerUser})
    .subscribe({
      next: (user: {user: User}) => {

        const registerUser = {...user.user};

        this.cookieService.put('token', registerUser.token);
        this.cookieService.put('image', registerUser.image);
        this.cookieService.put('username', registerUser.username);

        this.token = registerUser.token;
        if(this.token) {
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.registerErrors.next([]);
          this.saveAuthData();
          this.router.navigate(['/']);
        }
      },
      error: error => {
       const errors = Object.keys(error.error.errors)
         .map(error => error == 'email' ? 'email has already been taken' : 'username has already been taken');
       this.registerErrors.next(errors)
       this.isAuthenticated = false;
       this.authStatusListener.next(false);
      },
      complete: () => {
        this.registerErrors.next([])
      }
    })
  }

  login(email: string, password: string) {

    const loginUser = {email, password};

    this.http.post<{user: User}>(BACKEND_URL + "/users/login", {user: loginUser})
    .subscribe({
      next: (user: {user: User}) => {
        const loggedInUser = {...user.user};

        this.cookieService.put('token', loggedInUser.token);
        this.cookieService.put('image', loggedInUser.image);
        this.cookieService.put('username', loggedInUser.username);

        this.token = loggedInUser.token;
        if(this.token) {
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.loginErrors.next([]);
          this.saveAuthData();
          this.router.navigate(['/']);
        }
      },
      error: error => {
       const errors = Object.keys(error.error.errors).map(error => error ? 'email or password is invalid' : '');
       this.loginErrors.next(errors)
       this.isAuthenticated = false;
       this.authStatusListener.next(false);
      },
      complete: () => {
        this.loginErrors.next([])
      }
    })


  }

  private saveAuthData() {
    this.cookieService.put('loggedIn', 'true');
  }

  private clearAuthData() {
    this.cookieService.removeAll();
  }

  private getAuthData() {
    const loggedIn = this.cookieService.get("loggedIn");
    return loggedIn;
  }

  autoAuthUser() {
    const loggedIn = this.getAuthData();
    if(loggedIn == 'true') {
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      const savedToken = this.cookieService.get("loggedIn");
      this.token = savedToken;
    } else {
      this.isAuthenticated = false;
      this.authStatusListener.next(false);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
  }

}
