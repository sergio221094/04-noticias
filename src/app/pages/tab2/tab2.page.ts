import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

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

  segmentChanged(category: Event) {
    this.selectedCategory = (category as CustomEvent).detail.value;
    this.getData();
  }

  getData() {
    this.newsService.getTopHeadLinesByCategory(this.selectedCategory)
      .subscribe(articles => {
        this.articles = [...articles];
      });
  }

  loadData() {
    this.newsService.getTopHeadLinesByCategory(this.selectedCategory, true)
      .subscribe(articles => {

        if (articles.length === this.articles.length) {
          this.infiniteScroll.disabled = true;
          return;
        }
        setTimeout(() => {
          this.articles = articles;
          this.infiniteScroll.complete();

        }, 1200);
      });
  }

}
