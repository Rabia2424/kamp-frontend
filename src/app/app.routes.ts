import { Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { LoginComponent } from './components/login/login.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import { loginGuard } from './guards/login.guard';
import { RegisterComponent } from './components/register/register.component';


export const routes: Routes = [
    {path:"",pathMatch:"full", component:ProductComponent},
    {path:"products", component:ProductComponent},
    {path:"products/category/:categoryId", component:ProductComponent},
    {path:"products/add", component:ProductAddComponent, canActivate:[loginGuard]},
    {path:"login", component:LoginComponent},
    {path:"products/cartDetail", component:CartDetailComponent},
    {path:"register", component:RegisterComponent}
];
