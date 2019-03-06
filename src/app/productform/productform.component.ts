import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productform',
  templateUrl: './productform.component.html',
  styleUrls: ['./productform.component.css']
})
export class ProductformComponent implements OnInit {

  categories;
  price:number;

  constructor(categoryService: CategoryService, 
    private productService:ProductService,
    private router:Router) {
    this.categories = categoryService.getCategories();
   }

   save(product){
    console.log(product);
    this.productService.create(product);
    this.router.navigate(['/admin-products']);
   }

  ngOnInit() {
  }

}
