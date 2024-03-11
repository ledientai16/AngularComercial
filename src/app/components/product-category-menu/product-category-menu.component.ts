import { Component } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import {  RouterOutlet,RouterModule} from '@angular/router'; 
@Component({
  selector: 'app-product-category-menu',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    RouterModule,],
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css'
})
export class ProductCategoryMenuComponent {
  productCategories : ProductCategory[] = [];

  constructor(private productService : ProductService) { 
  }
  
  ngOnInit(){
    this.listProductCategory();
  }

  listProductCategory() {
    this.productService.getProductCategories().subscribe(
      data => {
        console.log('product category: ' + JSON.stringify(data));
        this.productCategories = data;
      }
    )
  }
} 