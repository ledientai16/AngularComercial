import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from '../product';
import { map, tap } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private basUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';
  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]> {
    let searchUrl = `${this.basUrl}/search/findByCategoryId?id=${theCategoryId}`
    return this.httpClient.get<GetResponeProduct>(searchUrl).pipe(
      map(response => response._embedded.products)
    )
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponeProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    )
  }

  getProductListByName(name: string): Observable<Product[]> {
    let searchUrl = `${this.basUrl}/search/findByNameContaining?name=${name}`
    return this.httpClient.get<GetResponeProduct>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductListPaginate(thePage: number,
    thePageSize: number,
    theCategoryId: number): Observable<GetResponeProduct> {
    const url = `${this.basUrl}/search/findByCategoryId`
      + `?id=${theCategoryId}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponeProduct>(url);
  }

  searchProductPaginate(thePage: number,
    thePageSize: number,
    theName: String): Observable<GetResponeProduct> {
    let searchUrl = `${this.basUrl}/search/findByNameContaining?name=${theName}&page=${thePage}&size=${thePageSize}`
    return this.httpClient.get<GetResponeProduct>(searchUrl);
  }
  getProductById(productId: number): Observable<Product> {
    let searchUrl = `${this.basUrl}/${productId}`

    return this.httpClient.get<Product>(searchUrl);
  }
}

interface GetResponeProduct {
  _embedded: {
    products: Product[]
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number,
  }
}

interface GetResponeProductCategory {
  _embedded: {
    productCategory: ProductCategory[]
  }
}