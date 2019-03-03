import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-productform',
  templateUrl: './productform.component.html',
  styleUrls: ['./productform.component.css']
})
export class ProductformComponent implements OnInit {

  categories;
  price:number;

  constructor(categoryService: CategoryService, private productService:ProductService) {
    this.categories = categoryService.getCategories();
   }

   save(product){
     console.log(product);
    //this.productService.create(product);
   }

  ngOnInit() {
  }

}
