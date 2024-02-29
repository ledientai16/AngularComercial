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

  getProductList(theCategoryId: number): Observable<Product[]> {
    let searchUrl = `${this.basUrl}/search/findByCategoryId?id=${theCategoryId}` 
    return this.httpClient.get<GetRespone>(searchUrl).pipe(
      map(response => response._embedded.products)
    )
  }
}
interface GetRespone {
  _embedded : {
    products : Product[ ]
  }
}