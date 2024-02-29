import { Component, NgModule, importProvidersFrom } from '@angular/core'; 
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule} from '@angular/common/http';
import { ProductService} from './services/product.service';
import {  RouterOutlet, Routes, RouterModule } from '@angular/router'; 
import { bootstrapApplication } from '@angular/platform-browser';

const routes: Routes = [
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'product', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ProductListComponent, 
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ProductService]
}) 
export class AppComponent {
  title = 'angular-ecommerce';
} 
