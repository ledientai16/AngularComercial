import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Country } from '../country';
import { State } from '../state';
@Injectable({
	providedIn: 'root'
})
export class MyShopFormService {
	private countryUrl = 'http://localhost:8080/api/countries';
	private stateUrl = 'http://localhost:8080/api/states';

	constructor(private httpClient: HttpClient) { }

	getCreditCardMonths(startMonth: number): Observable<number[]> {
		let data: number[] = [];

		for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
			data.push(theMonth);
		}

		return of(data);
	}

	getCreditCardYear(): Observable<number[]> {
		let data: number[] = [];
		let fromYear = new Date().getFullYear();
		let toYear = fromYear + 10;

		for (let year = fromYear; year <= toYear; year++) {
			data.push(year);
		}

		return of(data);
	}

	getCountries(): Observable<Country[]> {
		const searchUrl = this.countryUrl;
		return this.httpClient.get<GetResponeCoutry>(searchUrl).pipe(
			map(response => response._embedded.country)
		);
	}
	getStateByCode(code: string): Observable<State[]> {
		let searchUrl = `${this.stateUrl}/search/findByCountryCode?code=${code}`
		return this.httpClient.get<GetResponeState>(searchUrl).pipe(
			map(response => response._embedded.state)
		);
	}
}
interface GetResponeCoutry {
	_embedded: {
		country: Country[]
	}
}

interface GetResponeState {
	_embedded: {
		state: State[]
	}
}
