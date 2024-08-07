import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { ListResponseModel } from '../models/ListResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private httpClient:HttpClient) { }

  apiUrl="https://localhost:44384/api/";

  getProducts():Observable<ListResponseModel<Product>>{
    let newPath = this.apiUrl + "products/getall";
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }
  
  getProductsByCategory(categoryId:number):Observable<ListResponseModel<Product>>{
    let newPath = this.apiUrl + "products/getallbycategoryid/?id=" + categoryId;
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }

  add(product:Product):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "products/add",product);
  }

}
