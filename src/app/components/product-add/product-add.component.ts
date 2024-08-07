import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from '../../models/cartItem';
import { CartService } from '../../services/cart.service';



@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent implements OnInit{
  productAddForm : FormGroup;
  constructor(private formBuilder:FormBuilder,
    private productService:ProductService,
    private toastrService:ToastrService,
  ){};
  
  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm(){
    this.productAddForm = this.formBuilder.group({
      productName:["",Validators.required],
      unitPrice:["",Validators.required],
      unitsInStock:["",Validators.required],
      categoryId:["",Validators.required]
    })
  }

  add(){
    if(this.productAddForm.valid){
      let productModel = Object.assign({},this.productAddForm.value);
      this.productService.add(productModel).subscribe(data=>{
        this.toastrService.success(data.message);
      },responseError=>{
        console.log(responseError);
        if(responseError.error.Errors && responseError.error.Errors.length>0){
          console.log(responseError);
          for (let index = 0; index < responseError.error.Errors.length; index++) {
            this.toastrService.error(responseError.error.Errors[index].ErrorMessage,"Validation Exception!");
          }
        }else{
          this.toastrService.error(responseError.error.message);
        }
      })
    }else{
      this.toastrService.error("Form is not valid","Careful");
    }
  }


}
