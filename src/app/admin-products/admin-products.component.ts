import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products:any;
  constructor(private productService:ProductService) { 
    this.products = productService.getAll();
    productService.getAll().subscribe(res => console.log(res));
  }

  ngOnInit() {
  }
}
