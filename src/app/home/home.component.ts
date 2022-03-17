import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ArticleService } from '../articles/article.service';
import { Article, ArticlesResponse } from '../articles/article.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  activeTab = 'globalfeed';
  tag: string | null = null;
  articles: Article[] = [];
  isLoading = false;
  private authListenerSubs!: Subscription;
  private globalFeedSubs!: Subscription;
  private yourFeedSubs!: Subscription;
  private recentFeedSubs!: Subscription;

  globalFeed = true;

  constructor(private authService: AuthService, private articleService: ArticleService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });

    this.getFeedArticles(this.activeTab);

  }

  onSelectTab(activeTab: string) {
    this.activeTab = activeTab;
    this.getFeedArticles(activeTab);
  }

  getFeedArticles(activeTab: string) {
    this.isLoading = true;
    this.articles = [];
    if (activeTab === 'globalfeed') {
      this.globalFeedSubs = this.articleService.getGlobalFeedArticles().subscribe({
      next: articleResponse => {
        this.articles = articleResponse.articles;
        this.isLoading = false
      },
      error: error => {
        this.isLoading = false
      }})
    } else if (activeTab === 'yourfeed') {
      this.yourFeedSubs = this.articleService.getYourFeedArticles().subscribe(
      {
        next: articleResponse => {
          this.articles = articleResponse.articles;
          this.isLoading = false
        },
        error: error => {
          this.isLoading = false
        }
      }
      )
    }
  }

  recentTag(tag: string) {
    this.tag = tag;
    this.activeTab = 'tagfeed';
    this.articles = [];
    this.isLoading = true;
    this.recentFeedSubs = this.articleService.getTagFeedArticles(tag).subscribe({
      next: articleResponse => {
        this.articles = articleResponse.articles;
        this.isLoading = false
      },
      error: error => {
        this.isLoading = false
      }
    })
  }

  ngOnDestroy(){
    if(this.authListenerSubs) {
      this.authListenerSubs.unsubscribe();
    }
    if(this.globalFeedSubs) {
      this.globalFeedSubs.unsubscribe();
    }
    if(this.yourFeedSubs) {
      this.yourFeedSubs.unsubscribe();
    }
    if(this.recentFeedSubs) {
      this.recentFeedSubs.unsubscribe();
    }
  }

}
