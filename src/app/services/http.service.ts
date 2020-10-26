import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class HttpService {

	constructor(private _http: HttpClient, private _router: Router) { }

	private static getHeaders(headers: any = {}) {
		headers['Content-Type'] = 'application/json';
		const token = localStorage.getItem('access_token');
		if (token) {
			headers.Authorization = `Bearer ${token}`;
		}
		return new HttpHeaders(Object.assign({}, headers));
	}

	post(url, body?, headers?) {
		return this.request('post', url, headers, body);
	}

	get(url, params?, headers?) {
		return this.request('get', url, headers, null, params);
	}

	private request(method, url, headers?, body?, params?): Promise<any> {
		return new Promise((resolve, reject) => {
			if (!url.includes('http://') && !url.includes('https://')) {
				url = 'http://localhost:3000' + url;
			}
			this._http.request(method, url, {
				body: body ? JSON.stringify(body) : null,
				headers: HttpService.getHeaders(headers),
				params
			})
				.toPromise()
				.then(result => resolve(result))
				.catch(e => {
					console.error(e);
					if (e.status === 401) {
						localStorage.removeItem('access_token');
						localStorage.removeItem('role');
						this._router.navigateByUrl('/login');
					}
					reject(e);
				});
		});
	}


}
