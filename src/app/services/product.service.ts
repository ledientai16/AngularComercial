import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from '../product';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private basUrl = 'http://localhost:8080/api/products';
  constructor(private httpClient : HttpClient) { }

  getProductList(): Observable<Product[]> {
    return this.httpClient.get<GetRespone>(this.basUrl).pipe(
      map(response => response._embedded.products)
    )
  }
}
interface GetRespone {
  _embedded : {
    products : Product[ ]
  }
}