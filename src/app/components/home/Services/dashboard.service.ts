import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AppConfig } from '../../_config/app.config';
import { Dashboard } from '../Models/dahsboard.model';

@Injectable()

export class DashboardService {

    public apiUrl: string;
    constructor(private _http: Http, private _Route: Router) {
        this.apiUrl = new AppConfig().apiUrl;
    }

    public GetAllDashboardCount = (): Observable<any> => {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this._http.get(this.apiUrl + 'DashboardCount', options)
            .map((response: Response) => <any>response.json())
            .catch(response => {
                if (response.status === 401) {
                    this._Route.navigate(['Login']);
                }
                return response;
            });
    }
}
