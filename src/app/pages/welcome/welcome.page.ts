import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-welcome',
  templateUrl: 'welcome.page.html',
  styleUrls: ['welcome.page.scss']
})
export class WelcomePage implements OnInit {
  constructor(private translate: TranslateService, private favoriteService: FavoriteService) {}

  ngOnInit() {
    this.favoriteService.loadFavorites();
  }

  changeLanguage(lang) {
    this.translate.use(lang);
  }
}
