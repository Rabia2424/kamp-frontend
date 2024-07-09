import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductComponent } from './components/product/product.component'; 
import { NaviComponent } from './components/navi/navi.component';
import { CategoryComponent } from './components/category/category.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ProductComponent,NaviComponent,CategoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'northwind';
  user:string ="Eagle";
}
