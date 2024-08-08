import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService
  ){};
  loginForm:FormGroup;

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ["",Validators.required],
      password: ["",Validators.required]
    });
  }

  login(){
    if(this.loginForm.valid){
      //console.log(this.loginForm.value);
      let loginModel = Object.assign({}, this.loginForm.value);

      this.authService.login(loginModel).subscribe(response=>{
        if(response.success){
          this.toastrService.success(response.message);
          localStorage.setItem("token",response.data.token);
        }
        //console.log(data);
      },responseError=>{
        console.log(responseError);
        this.toastrService.error(responseError.error.message);
      }
    );
    }
  }

}
