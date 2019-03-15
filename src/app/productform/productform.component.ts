import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-productform',
  templateUrl: './productform.component.html',
  styleUrls: ['./productform.component.css']
})
export class ProductformComponent implements OnInit, OnDestroy {

  categories:Observable<{}[]>;
  price:number;
  id:string;
  product:any = {};

  constructor(categoryService: CategoryService, 
    private productService:ProductService,
    private route:ActivatedRoute,
    private db:AngularFireDatabase,
    private router:Router) {
    this.categories = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');

   }

   save(product){
    if(this.id){
      this.productService.update(product, this.id);
    }
    else this.productService.create(product);
    this.router.navigate(['/admin-products']);
   }

   delete(){
     if(confirm('Do you want to delete this product?')){
       this.productService.deleteProduct(this.id);
       this.router.navigate(['/admin-products']);
     }
     else return;
   }

  ngOnInit() {
    if(this.id){
      this.productService.getProduct(this.id).pipe(
        take(1)
      ).subscribe(s => {
        this.product = s;
      })
    }
  }

  ngOnDestroy(){
  }

}
