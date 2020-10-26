import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-item-details',
	templateUrl: './item-details.component.html',
	styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnDestroy {

	id: string;
	item;
	rating;
	recommendations;
	private _destroy = new Subject();

	constructor(private _route: ActivatedRoute, private _http: HttpService) {
		// this.id = this._route.snapshot.params.id;

		this._route.params
			.pipe(takeUntil(this._destroy))
			.subscribe(({id}) => {
				this.id = id;

				this._http.post('/item', {itemId: this.id})
					.then(i => {
						this.item = i;
					});

				this._http.post('/content-based-recommendations', {itemId: this.id})
					.then(recommendations => {
						console.log(recommendations);
						this.recommendations = recommendations;
					});

				this._http.post('/rating', {itemId: this.id})
					.then(({value}) => {
						this.rating = value;
					});
			});
	}

	rateItem() {
		this._http.post('/rate', {itemId: this.id, rating: this.rating})
			.then(console.log);
	}

	ngOnDestroy() {
		this._destroy.next();
		this._destroy.complete();
	}

}
