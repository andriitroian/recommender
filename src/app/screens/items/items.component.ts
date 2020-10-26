import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
	selector: 'app-items',
	templateUrl: './items.component.html',
	styleUrls: ['./items.component.scss']
})
export class ItemsComponent {

	items;
	recommendations;

	constructor(private _http: HttpService) {
		this._http.get('/items')
			.then(items => {
				console.log(items);
				this.items = items;
			});

		this._http.get('/collaborative-filtering-recommendations')
			.then(r => {
				console.log(r);
				this.recommendations = r.filter(recommendation => recommendation.rating > 3);
			});
	}

}
