import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Category } from 'src/model/category.model';

@Injectable({ providedIn: 'root'})
export class FavoriteService {
    key = 'FAVORITES';

    favorites: Category[] = [];

    constructor(private storage: Storage) { }

    loadFavorites() {
        this.storage.get(this.key).then((favorites: Category[]) => {
            this.favorites = favorites;
        });
    }

    isFavorite(category: Category) {
        return this.favorites.some(fav => fav.id === category.id);
    }

    favorite(category: Category) {
        this.favorites.push(category);
        this.saveFavorites();
    }

    unFavorite(category: Category) {
        this.favorites = this.favorites.filter(fav => {
            return fav.id !== category.id;
        });
        this.saveFavorites();
    }

    saveFavorites() {
        this.storage.set(this.key, this.favorites).then(val => this.loadFavorites());
    }

    clearFavorites() {
        return this.storage.clear().then(val => this.loadFavorites());
    }
}
