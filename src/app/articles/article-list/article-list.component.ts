import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticlesResponse, Article } from '../article.model';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  @Input() articles: Article[] = [];
  @Input() isLoading!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
