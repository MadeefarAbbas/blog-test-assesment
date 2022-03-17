import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { TagService } from './tag.service';
import { Observable, Subscription } from 'rxjs';
import { Tag } from './tag.model';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit, OnDestroy {

  tags!: Tag[];
  isLoading = false;

  @Output() clickedTagEvent = new EventEmitter<string>();

  tagSubscription!: Subscription;

  constructor(private tagService: TagService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.tagSubscription = this.tagService.getTags().subscribe((tags: {tags: Tag[]}) => {
      this.tags = tags.tags;
      this.isLoading = false;
    })
  }

  onTagClick(tag: any) {
    this.clickedTagEvent.emit(tag);
  }

  ngOnDestroy(): void {
    if(this.tagSubscription) {
      this.tagSubscription.unsubscribe();
    }
  }

}
