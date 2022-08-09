import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public articles: Article[] = [];
  public categories: string[] = [
    'business',
    'entertainment',
    'general',
    'healths',
    'cience',
    'sports',
    'technology'];
  public selectedCategory: string = this.categories[0];

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.getData();
  }

  segmentChanged(category: any) {
    this.selectedCategory = category.detail.value;
    this.getData();
  }

  getData() {
    this.newsService.getTopHeadLinesByCategory(this.selectedCategory)
      .subscribe(articles => {
        this.articles = [ ...articles];
      });
  }

}
