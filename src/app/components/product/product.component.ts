import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
 
  products:Product[]=[];
  dataLoaded = false;

  // productResponseModel:ProductResponseModel={
  //   data : this.products,
  //   message:"",
  //   success:true
  // };

  constructor(private productService:ProductService,
    private activatedRoute:ActivatedRoute) {}  


  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(params=>{
      if(params["categoryId"]){
        this.getProductsByCategory(params["categoryId"]);
      }else{
        this.getProducts();
      }
    });
  }

  getProducts(){
    this.productService.getProducts()
    .subscribe(response=>{
      this.products = response.data;
      this.dataLoaded = true;
    })
  }

  getProductsByCategory(categoryId:number){
    this.productService.getProductsByCategory(categoryId)
    .subscribe(response=>{
      this.products = response.data;
      this.dataLoaded = true;
    })
  }

}
