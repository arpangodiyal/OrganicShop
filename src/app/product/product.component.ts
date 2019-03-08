import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  products:any[] = [];
  filteredProducts:any[] = [];
  categories;
  subscription1: Subscription
  subscription2: Subscription
  query:string = '';

  constructor(private productService:ProductService, 
    private categoryService:CategoryService,
    private route:ActivatedRoute,
    private cartService:ShoppingCartService) { 
      this.categories = this.categoryService.getAll();

      this.subscription1 = this.route.queryParams.subscribe(r => {

        this.subscription2 = this.productService.getAll().subscribe(res => {
          this.products = this.filteredProducts = res;
          if( r.category){
            this.filteredProducts = this.products.filter( p => p.category.includes(r.category));
          }
          else{
            this.filteredProducts = this.products;
          }
        });
      });
  }

  addToCart(product){

    this.cartService.addToCart(product);
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }

}