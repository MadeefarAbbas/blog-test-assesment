import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ArticleListComponent } from './articles/article-list/article-list.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ArticleItemComponent } from './articles/article-list/article-item/article-item.component';
import { TagsComponent } from './tags/tags.component';

import { CookieModule } from 'ngx-cookie';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    ArticleListComponent,
    HomeComponent,
    ArticleItemComponent,
    TagsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    CookieModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
