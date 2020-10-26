import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	constructor(private _http: HttpService) { }

	login(login: string, password: string) {
		return this._http.post('/login', {login, password})
			.then(({token}) => {
				localStorage.setItem('access_token', token);
				return {token};
			});
	}
}
