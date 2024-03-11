import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
 

export const routes: Routes = [ 
    {path: 'category/:id', component: ProductListComponent},
    {path: 'category', component: ProductListComponent},
    {path: 'product', component: ProductListComponent},
    {path: 'search/:keyword', component: ProductListComponent}, 
];
