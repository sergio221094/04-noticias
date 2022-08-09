import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article, NewsResponse, ArticleByCategoryAndPage } from '../interfaces';
import { map } from 'rxjs/operators';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private articleByCategoryAndPage: ArticleByCategoryAndPage = {};

  constructor(private http: HttpClient) { }

  public getTopHeadlines(): Observable<Article[]> {
    return this.executeQuery<NewsResponse>(`top-headlines?category=general`).pipe(map(({ articles }) => articles));
    /*return this.http.get<NewsResponse>('/assets/data/general.json').pipe(
      map(({ articles }) => articles)
    );*/
  }

  public getTopHeadLinesByCategory(category: string, loadMore: boolean = false): Observable<Article[]> {

    if (loadMore) {
      return this.getArticlesByCategory(category);
    };

    if (this.articleByCategoryAndPage[category]) {
      return of(this.articleByCategoryAndPage[category].articles);
    }

    return this.getArticlesByCategory(category);

    return this.executeQuery<NewsResponse>(`top-headlines?category=${category}`).pipe(map(({ articles }) => articles));
    /* this.http.get<NewsResponse>(`/assets/data/${category}.json`).pipe(
      map(({ articles }) => articles)
    );*/
  }

  private executeQuery<T>(endpoint: string) {
    console.log('Petición HTTP realizada');
    return this.http.get<T>(`${apiUrl}${endpoint}`, {
      params: {
        apiKey,
        country: 'us'
      }
    });
  }

  private getArticlesByCategory(category: string): Observable<Article[]> {
    if (!Object.keys(this.articleByCategoryAndPage).includes(category)){
      this.articleByCategoryAndPage[category] = {
        page: 0,
        articles: []
      };
    }

    const page = this.articleByCategoryAndPage[category].page + 1;

    return this.executeQuery<NewsResponse>(`/top-headlines?category=${category}&page=${page}`)
      .pipe(map(({ articles }) => {

        if (articles.length === 0) {
          return [];
        };
        this.articleByCategoryAndPage[category] = {
          page,
          articles: [...this.articleByCategoryAndPage[category].articles, ...articles]
        };
        return this.articleByCategoryAndPage[category].articles;
      }));
  }

}
