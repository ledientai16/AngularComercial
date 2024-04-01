import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { of } from 'rxjs';
@Injectable({
	providedIn: 'root'
})
export class MyShopFormService {

	constructor() { }

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
}
