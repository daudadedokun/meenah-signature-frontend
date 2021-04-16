import { ProductFormComponent } from './admin/product-form/product-form.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { RegisterComponent } from './register/register.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'shopping-cart', component:ShoppingCartComponent},
  {path:'my/orders', component:MyOrdersComponent},
  {path:'admin/orders', component:AdminOrdersComponent,canActivate:[AuthGuard,AdminAuthGuard]},
  {path:'admin/products/new', component:ProductFormComponent,canActivate:[AuthGuard,AdminAuthGuard]},
  {path:'admin/products/:id', component:ProductFormComponent,canActivate:[AuthGuard,AdminAuthGuard]},
  {path:'admin/products', component:AdminProductsComponent,canActivate:[AuthGuard,AdminAuthGuard]},

  {path:'shopping-cart', component:ShoppingCartComponent},
  {path:'login',component:LoginComponent},
  {path:'no-access',component:NoAccessComponent},
   {path:'register',component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
