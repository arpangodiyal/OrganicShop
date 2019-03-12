import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  products:any[] = [];
  filteredProducts:any[] = [];
  itemNo = new Object();
  categories;
  subscription1: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  query:string = '';
  cartId:string = localStorage.getItem('CartId');

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
          this.cartId = localStorage.getItem('cartId');

          this.filteredProducts.forEach(cur => {
            let item = this.cartService.getItem(this.cartId, cur);
            this.subscription3 = (item.valueChanges() as Observable<{'quantity':number, 'product':{'key'}}>).subscribe(s => {
              if(s) this.itemNo[s.product.key] = s.quantity;
            })
          })
        });
      });
  }

  async addToCart(product){
    if(!this.cartId)this.cartId = await this.cartService.getOrCreateCartId();
    this.cartService.addToCart(product);
    let item = this.cartService.getItem(this.cartId, product);
    (item.valueChanges() as Observable<{'quantity':number, 'product':{'key'}}>).subscribe(s => {
      if(s) this.itemNo[s.product.key] = s.quantity;
    })
  }

  removeFromCart(product){
    this.cartService.removeFromCart(product).then(r => {
      if(r == 0){
        delete this.itemNo[product.key];
      }
    })
  }

  ngOnInit() {
    
  }

  ngOnDestroy(){
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
  }

}