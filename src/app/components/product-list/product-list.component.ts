import { Component, OnInit } from '@angular/core';


import { ProductService } from '../../services/product.service';
import { Product } from '../../product';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list-table.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products : Product[] = [];
  constructor(private productService : ProductService) {

  }
  ngOnInit(): void {
    this.productService.getProductList().subscribe(
      data => {
        this.products = data;
      }
    )
  }
}
