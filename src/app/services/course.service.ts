import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { Course } from '../../model/course.model';

@Injectable({ providedIn: 'root'})
export class CourseService {
    private resourceUrl = ApiService.API_URL + '/courses';

    constructor(protected http: HttpClient) { }

    create(course: Course): Observable<HttpResponse<Course>> {
        return this.http.post<Course>(this.resourceUrl, course, { observe: 'response'});
    }

    update(course: Course): Observable<HttpResponse<Course>> {
        return this.http.put(this.resourceUrl, course, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<Course>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<Course[]>> {
        const options = createRequestOption(req);
        return this.http.get<Course[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
