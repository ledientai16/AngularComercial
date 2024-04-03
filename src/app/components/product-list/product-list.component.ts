import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CartItem } from '../../cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule, RouterModule],
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 0;
  searchMode: Boolean = false;
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElement: number = 0;
  previousCategoryId: number = 1;
  page: any;
  theKeyWord: string = '';
  thePreviousKeyWord: String = '';
  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has("keyword");

    if (this.searchMode) {
      this.handleSearchProduct();
    } else {
      this.handleListProduct();
    }
  }

  handleSearchProduct() {
    const hasName: Boolean = this.route.snapshot.paramMap.has('keyword');
    if (hasName) {
      this.theKeyWord = String(this.route.snapshot.paramMap.get('keyword'));
    } else {
      this.theKeyWord = '';
    }
    // this.productService.getProductListByName(this.name).subscribe(
    //   data => {
    //     this.products = data;
    //   }
    // ) 
    if (this.theKeyWord != this.thePreviousKeyWord) {
      this.thePageNumber = 1;
    }
    this.thePreviousKeyWord = this.theKeyWord;

    this.productService.searchProductPaginate(
      this.thePageNumber - 1,
      this.thePageSize,
      this.theKeyWord).subscribe(this.processResult());
  }

  handleListProduct() {
    const hasCategory: boolean = this.route.snapshot.paramMap.has('id');
    this.previousCategoryId = this.currentCategoryId;
    if (hasCategory) {
      this.currentCategoryId = Number(this.route.snapshot.paramMap.get('id'));
    } else {
      this.currentCategoryId = 1
    }

    // this.productService.getProductList(this.currentCategoryId).subscribe(
    //   data => {
    //     this.products = data;
    //   }
    // )
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }
    this.productService.getProductListPaginate(
      this.thePageNumber - 1,
      this.thePageSize,
      this.currentCategoryId).subscribe(this.processResult());
  }

  updatePageSize(pageSize: String) {
    let pageSizeNum = Number(pageSize);
    this.thePageSize = pageSizeNum;
    this.thePageNumber = 1;

    this.listProducts();
  }

  processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElement = data.page.totalElements;
    };
  }

  addToCard(theProduct: Product) {
    console.log('add to cart')
    console.log(`adding to card ${theProduct.name}, ${theProduct.unitPrice}`);

    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }
}
