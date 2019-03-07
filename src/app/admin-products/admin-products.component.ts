import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products:any[];
  filteredProducts:any[];
  subscription:Subscription;
  constructor(private productService:ProductService) { 
    this.subscription = productService.getAll().subscribe(r =>{
      this.products = this.filteredProducts = r;
    });
  }

  filter(query:string){
    this.filteredProducts = query ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())):
      this.products;
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
