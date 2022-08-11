import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;
  public articles: Article[] = [];
  public category = 'general';

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.newsService.getTopHeadLinesByCategory(this.category)
      .subscribe(articles => {
        this.articles = [...articles];
      });
  }

  loadData() {
    this.newsService.getTopHeadLinesByCategory(this.category, true)
      .subscribe(articles => {

        if (articles.length === this.articles.length) {
          this.infiniteScroll.disabled = true;
          return;
        }
        this.articles = articles;
        this.infiniteScroll.complete();
      });
  }
}
