import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Article } from './../../interfaces/index';
import { Component, Input } from '@angular/core';
import { ActionSheetController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {

  @Input() article: Article;
  @Input() index: number;

  constructor(
    private iab: InAppBrowser,
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing
  ) { }


  openArticle() {

    if (this.platform.is('ios') || this.platform.is('android')) {
      const browser = this.iab.create(this.article.url);
      browser.show();
      return;
    }

    window.open(this.article.url, '_blank');

  }

  async onOpenMenu() {

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Options',
      buttons: [
        {
          text: 'Fav',
          icon: 'heart-outline',
          handler: () => this.onToggleFavorite()
        },
        {
          text: 'Cancel',
          icon: 'close-outline',
          role: 'cancel'
        }
      ]
    });

    const share = {
      text: 'Share',
      icon: 'share-outline',
      handler: () => this.onShareArticle()
    };

    if (this.platform.is('capacitor')) {
      actionSheet.buttons.unshift(share);
    }

    await actionSheet.present();
  }

  onShareArticle() {
    const { title, source, url } = this.article;
    this.socialSharing.share(
      title,
      source.name,
      null,
      url
    );
  }

  onToggleFavorite() {
    console.log('Share article');
  }

}
