import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './screens/login/login.component';
import { ItemsComponent } from './screens/items/items.component';
import { ItemDetailsComponent } from './screens/item-details/item-details.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuard } from './services/login.guard';
import { StarRatingComponent } from './components/star-rating/star-rating.component';

const routes: Routes = [
	{path: '', redirectTo: '/items', pathMatch: 'full'},
	{path: 'login', component: LoginComponent},
	{path: 'items', component: ItemsComponent, canActivate: [LoginGuard]},
	{path: 'items/:id', component: ItemDetailsComponent, canActivate: [LoginGuard]},
];

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		ItemsComponent,
		ItemDetailsComponent,
		StarRatingComponent
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes),
		FormsModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
