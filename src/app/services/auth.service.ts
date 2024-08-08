import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { HttpClient } from '@angular/common/http';
import { TokenModel } from '../models/tokenModel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { RegisterModel } from '../models/registerModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl="https://localhost:44384/api/auth/";
  constructor(private httpClient:HttpClient) { }

  login(user:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",user);
  }

  register(user:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "register",user);
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }

}
