import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { Tag } from './tag.model';
import { BYPASS_LOG } from '../auth/auth.interceptor';


const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class TagService {

  constructor(private http: HttpClient) { }

  getTags(): Observable<{tags: Tag[]}> {
    return this.http.get<{tags: Tag[]}>(BACKEND_URL + '/tags', { context: new HttpContext().set(BYPASS_LOG, true) });
  }
}
