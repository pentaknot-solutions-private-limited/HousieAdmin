import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AppConfig } from '../../_config/app.config';
import { LoginModel } from '../Models/login.model';

@Injectable()
export class LoginService {

    public apiUrl: string;

    constructor(private _http: Http, private _Route: Router) {
        this.apiUrl = new AppConfig().apiUrl;
    }

    validateLoginUser(loginModel: LoginModel) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this._http.post(this.apiUrl + 'Login', loginModel, options).
            map((response: Response) => {
                const webresponse = response.json() && response.json();
                if (webresponse != null) {
                    if (webresponse.adminId != null) {
                        // tslint:disable-next-line:max-line-length
                        localStorage.setItem('UHKey', JSON.stringify({ AdminId: webresponse.adminId, Name: webresponse.name, EmailId: webresponse.email }));
                    }
                    return webresponse;
                } else {
                    return null;
                }
            }
            ).catch(response => {
                if (response.status === 401) {
                    this._Route.navigate(['Login']);
                }
                return response;
            });
    }

    private handleError(err: any) {
        let errorMessage: string;
        if (err instanceof Response) {
            const body = err.json() || '';
            const error = body.error || JSON.stringify(body);
            errorMessage = `${err.status} - ${err.statusText} || ''} ${error}`;
        } else {
            errorMessage = err.message ? err.message : err.toString();
        }

        return Observable.throw(errorMessage);
    }
}
