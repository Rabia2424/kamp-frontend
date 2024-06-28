import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductResponseModel } from '../models/productResponseModel';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private httpClient:HttpClient) { }

  apiUrl="https://localhost:44384/api/products/getall"

  getProducts():Observable<ProductResponseModel>{
    return this.httpClient.get<ProductResponseModel>(this.apiUrl);
   
  }
  
}
