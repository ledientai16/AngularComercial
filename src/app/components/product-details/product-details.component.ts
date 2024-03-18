import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import {ActivatedRoute, Route, RouterModule, RouterOutlet} from '@angular/router';
import { Product } from '../../product';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  product : Product | undefined ;

  constructor(private productService : ProductService,
    private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.route.paramMap.subscribe(
      () => {
        this.handleProductDetail();
      }
    )
  }

  handleProductDetail() {
    let productId : number = Number(this.route.snapshot.paramMap.get('id'));
    
    this.productService.getProductById(productId).subscribe(
      data => {
        this.product = data
      }
    )
  }
}
