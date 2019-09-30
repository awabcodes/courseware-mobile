import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { AccountService } from 'src/app/services/auth/account.service';
import { LoginService } from 'src/app/services/login/login.service';
import { Account } from 'src/model/account.model';
import { Course, CourseService } from './course';
import { JhiDataUtils } from 'ng-jhipster';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/model/category.model';
import { FormControl } from '@angular/forms';
import { CustomAlertService } from 'src/app/services/custom-alert.service';
import { CategoryService } from 'src/app/services/category.service';
import * as moment from 'moment';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  account: Account;
  courses: Course[];
  favoriteCourses: Course[];

  category: Category;
  categories: Category[];

  categoryIds: number[];

  level: string;

  public searchControl: FormControl;
  searchQuery: string;
  searching: any = false;

  isSlides = true;
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor(
    public navController: NavController,
    private accountService: AccountService,
    private loginService: LoginService,
    private dataUtils: JhiDataUtils,
    private courseService: CourseService,
    private customAlertService: CustomAlertService,
    public plt: Platform,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private favoriteService: FavoriteService
  ) {
    this.searchControl = new FormControl();
    this.courses = [];

    this.route.queryParams.subscribe(params => {
      this.getCategories();

      if (this.router.getCurrentNavigation().extras.state) {
        this.category = this.router.getCurrentNavigation().extras.state.category;
      }

      this.loadAll();
      this.getFavoriteCategories();
    });
  }

  getCategories() {
    this.categoryService.query({size: 9000000})
      .subscribe(
      data => {
        this.categories = data.body;
      },
      (error) => console.log(error));
  }

  ngOnInit() {
    this.accountService.identity().then(account => {
      if (account === null) {
        this.goBackToHomePage();
      } else {
        this.account = account;
      }
    });

    this.searchControl.valueChanges
      .subscribe(search => {
        this.searchQuery = search;
        this.loadAll();
      });
  }

  onSearchInput() {
    this.searching = true;
  }

  async loadAll(refresher?) {
    this.courseService.query({
      size: 9000000,
      'categoryId.equals': this.category ? this.category.id : '',
      'title.contains': this.searchQuery ? this.searchQuery : '',
      'level.equals': this.level ? this.level : '',
    }).pipe(
        filter((res: HttpResponse<Course[]>) => res.ok),
        map((res: HttpResponse<Course[]>) => res.body)
    )
    .subscribe(
        (response: Course[]) => {
            this.courses = response;
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

  getFavoriteCategories() {
    this.categoryIds = this.favoriteService.favorites.map(val => val.id);
    if (this.categoryIds.length !== 0) {
      this.loadFromFavorites();
    }
  }

  async loadFromFavorites() {
    console.log(this.categoryIds);
    this.courseService.query({
      size: 9000000,
      'startDate.greaterThan': moment().format('YYYY-MM-DD'),
      'categoryId.in': this.categoryIds
    }).pipe(
        filter((res: HttpResponse<Course[]>) => res.ok),
        map((res: HttpResponse<Course[]>) => res.body)
    )
    .subscribe(
        (response: Course[]) => {
            this.favoriteCourses = response;
        },
        async (error) => {
            console.error(error);
            this.customAlertService.showToast('DATA_LOAD_ERROR');
        });
  }

  trackId(index: number, item: Course) {
      return item.id;
  }

  trackCategoryById(index: number, item: Category) {
    return item.id;
  }

  byteSize(field) {
      return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
      return this.dataUtils.openFile(contentType, field);
  }

  view(course: Course) {
      this.navController.navigateForward('/tabs/home/course/' + course.id + '/view');
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  logout() {
    this.loginService.logout();
    this.goBackToHomePage();
  }

  private goBackToHomePage(): void {
    this.navController.navigateBack('');
  }
}
