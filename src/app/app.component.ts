import { Component, NgModule, importProvidersFrom } from '@angular/core'; 
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { HttpClientModule} from '@angular/common/http';
import { ProductService} from './services/product.service';
import {  RouterOutlet,RouterModule} from '@angular/router';  
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ 
    RouterOutlet,
    RouterModule,
    ProductListComponent,
    ProductCategoryMenuComponent, 
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ ProductService]
})  
export class AppComponent {
  title = 'angular-ecommerce';
}

// bootstrapApplication(AppComponent, {
//   providers: [
//     importProvidersFrom(RouterModule.forRoot(
//        routes
//     )),
//     HttpClientModule,
//     ProductService,
//   ]
// }).catch(err => console.error(err));
 