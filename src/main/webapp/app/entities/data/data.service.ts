import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Data } from './data.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Data>;

@Injectable()
export class DataService {

    private resourceUrl =  SERVER_API_URL + 'api/data';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(data: Data): Observable<EntityResponseType> {
        const copy = this.convert(data);
        return this.http.post<Data>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(data: Data): Observable<EntityResponseType> {
        const copy = this.convert(data);
        return this.http.put<Data>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Data>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Data[]>> {
        const options = createRequestOption(req);
        return this.http.get<Data[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Data[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Data = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Data[]>): HttpResponse<Data[]> {
        const jsonResponse: Data[] = res.body;
        const body: Data[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Data.
     */
    private convertItemFromServer(data: Data): Data {
        const copy: Data = Object.assign({}, data);
        copy.createdAt = this.dateUtils
            .convertDateTimeFromServer(data.createdAt);
        return copy;
    }

    /**
     * Convert a Data to a JSON which can be sent to the server.
     */
    private convert(data: Data): Data {
        const copy: Data = Object.assign({}, data);

        copy.createdAt = this.dateUtils.toDate(data.createdAt);
        return copy;
    }
}
