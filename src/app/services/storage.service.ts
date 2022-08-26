import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage | null = null;
  private localArticles: Article[] = [];

  constructor(private storageCtrl: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storageCtrl.create();
    this.storage = storage;
  }

  async saveRemoveArticle( article: Article){
    this.localArticles =  [article, ...this.localArticles];
    this.storageCtrl.set('articles', this.localArticles);
  }
}
