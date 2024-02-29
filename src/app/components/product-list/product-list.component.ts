import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../product';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterModule} from '@angular/router';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 0;

  constructor(private productService : ProductService,
              private route: ActivatedRoute) { 
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
        this.listProducts();
    })
  }
  listProducts() {
    const hasCategory: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategory) {
        this.currentCategoryId = Number(this.route.snapshot.paramMap.get('id'));
    } else {
        this.currentCategoryId = 1
    }
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }
}
