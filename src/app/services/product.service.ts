import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from '../product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private basUrl = 'http://localhost:8080/api/products';
  constructor(private httpClient : HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]> {
    let searchUrl = `${this.basUrl}/search/findByCategoryId?id=${theCategoryId}` 
    return this.httpClient.get<GetResponeProduct>(searchUrl).pipe(
      map(response => response._embedded.products)
    )
  }

  getProductCategories(): Observable<ProductCategory[]> {
    let searchUrl = 'http://localhost:8080/api/product-category';

    return this.httpClient.get<GetResponeProductCategory>(searchUrl).pipe(
      map(response => response._embedded.productCategories)
    )
  }
}
interface GetResponeProduct {
  _embedded : {
    products : Product[ ]
  }
}

interface GetResponeProductCategory {
  _embedded : {
    productCategories : ProductCategory[ ]
  }
}