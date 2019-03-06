import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
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
  product:{} = {};

  constructor(categoryService: CategoryService, 
    private productService:ProductService,
    private route:ActivatedRoute,
    private router:Router) {
    this.categories = categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');

   }

   save(product){
    console.log(product);
    if(this.id){
      this.productService.update(product, this.id);
    }
    else this.productService.create(product);
    this.router.navigate(['/admin-products']);
   }

  ngOnInit() {
    if(this.id){
      this.productService.getProduct(this.id).pipe(
        take(1)
      ).subscribe(r => {this.product = r; console.log(this.product);});
    }
  }

  ngOnDestroy(){
  }

}
