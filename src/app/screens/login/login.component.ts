import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	login: string;
	password: string;

	constructor(private _login: LoginService, private _router: Router) { }

	ngOnInit() {
	}

	signin() {
		this._login.login(this.login, this.password)
			.then(() => {
				this._router.navigateByUrl('/items');
			});
	}

}
