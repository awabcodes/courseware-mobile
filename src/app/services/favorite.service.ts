import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { Favorite } from '../../model/favorite.model';

@Injectable({ providedIn: 'root'})
export class FavoriteService {
    private resourceUrl = ApiService.API_URL + '/favorites';

    constructor(protected http: HttpClient) { }

    create(favorite: Favorite): Observable<HttpResponse<Favorite>> {
        return this.http.post<Favorite>(this.resourceUrl, favorite, { observe: 'response'});
    }

    update(favorite: Favorite): Observable<HttpResponse<Favorite>> {
        return this.http.put(this.resourceUrl, favorite, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<Favorite>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<Favorite[]>> {
        const options = createRequestOption(req);
        return this.http.get<Favorite[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
