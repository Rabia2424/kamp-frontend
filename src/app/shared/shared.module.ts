import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { provideHttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from '../components/product/product.component';
import { NaviComponent } from '../components/navi/navi.component';
import { CategoryComponent } from '../components/category/category.component';

@NgModule({
  imports: [
    CommonModule,
    ProductComponent,
    NaviComponent,
    CategoryComponent,
    HttpClientModule
  ],
  //providers: [provideHttpClient()] ,
  exports: [
    ProductComponent,
    NaviComponent,
    CategoryComponent
  ]
})
export class SharedModule { }
