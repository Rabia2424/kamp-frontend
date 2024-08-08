import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  registerForm: FormGroup;
  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value);
      this.authService.register(registerModel).subscribe((response) => {
        if (response.success) {
          this.toastrService.success(response.message);
          localStorage.setItem("token", response.data.token);
        }
      },responseError=>{
        console.log(responseError);
      });
    }
  }


}