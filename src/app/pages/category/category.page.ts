import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Category } from 'src/model/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { CustomAlertService } from 'src/app/services/custom-alert.service';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-category',
  templateUrl: 'category.page.html',
  styleUrls: ['category.page.scss']
})
export class CategoryPage implements OnInit {
    categories: Category[];

    constructor(
        private navController: NavController,
        private categoryService: CategoryService,
        private customAlertService: CustomAlertService,
        public plt: Platform,
        private favoriteService: FavoriteService
    ) {
        this.categories = [];
    }

    ngOnInit() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.categoryService.query().pipe(
            filter((res: HttpResponse<Category[]>) => res.ok),
            map((res: HttpResponse<Category[]>) => res.body)
        )
        .subscribe(
            (response: Category[]) => {
                this.categories = response;
                if (typeof(refresher) !== 'undefined') {
                    setTimeout(() => {
                        refresher.target.complete();
                    }, 750);
                }
            },
            async (error) => {
                console.error(error);
                this.customAlertService.showToast('DATA_LOAD_ERROR');
            });
    }

    trackId(index: number, item: Category) {
        return item.id;
    }

    viewCourses(category: Category) {
        this.navController.navigateForward('/tabs/home', {state: {category}});
    }

    isFavorite(category: Category) {
        return this.favoriteService.isFavorite(category);
    }

    favorite(category: Category) {
        this.favoriteService.favorite(category);
    }

    unFavorite(category: Category) {
        this.favoriteService.unFavorite(category);
    }
}
