import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
 

export const routes: Routes = [ 
    {path: 'category/:id', component: ProductListComponent},
    {path: 'category', component: ProductListComponent},
    {path: 'product', component: ProductListComponent},
    {path: 'search/:keyword', component: ProductListComponent}, 
    {path: 'product/:id', component: ProductDetailsComponent}, 
    {path: 'cart-details', component: CartDetailsComponent},
]; 
