import { Injectable } from '@angular/core';
import { HttpClient, HttpContext  } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { ArticlesResponse } from './article.model';
import { Observable } from 'rxjs';
import { BYPASS_LOG } from '../auth/auth.interceptor';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {
  }

  getGlobalFeedArticles(): Observable<ArticlesResponse> {
    return this.http.get<ArticlesResponse>(BACKEND_URL + '/articles?limit=10&offset=0',{ context: new HttpContext().set(BYPASS_LOG, true) });
  }

  getYourFeedArticles(): Observable<ArticlesResponse> {
    return this.http.get<ArticlesResponse>(BACKEND_URL + '/articles/feed?limit=10&offset=0');
  }

  getTagFeedArticles(tag: string): Observable<ArticlesResponse> {
    return this.http.get<ArticlesResponse>(BACKEND_URL + `/articles?limit=10&offset=0&tag=${tag}`,{ context: new HttpContext().set(BYPASS_LOG, true) });
  }

}
