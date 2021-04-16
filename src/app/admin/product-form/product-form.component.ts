import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from './../../services/product.service';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit{
  categories$
  products$:any
  product:any = {}
  productId:any

  constructor(
    private catService:CategoryService,
     private prodService:ProductService, 
     private router:Router,
     private route: ActivatedRoute
     ) { 
    this.categories$ = catService.getAllCategories();
  }
  ngOnInit(): void {
    this.getProduct();
  }


  save(product:any){
    console.log(product);
    console.log(product.category);
    
    
 
    if(this.productId){
      this.prodService.update(product).subscribe((res)=>{
        console.log(res);
        this.router.navigate(['/admin/products'])
      },(err)=>{
        console.log(err);
        
      })
    }
       
      else {
        this.prodService.create(product)
  
      .subscribe((res:any)=>{
      this.router.navigate(['/admin/products'])

        this.products$ = res
        
    },(err:HttpErrorResponse)=>{
      console.log(err);
      
    })
    }
    
  }

  getProduct(){
    let id = this.route.snapshot.paramMap.get('id');
    this.productId = id;
    if(id){
      this.prodService.getProduct(parseInt(id)).pipe(take(1)).subscribe((res:any)=>{
      this.product = res;
    },(err:HttpErrorResponse)=>{
      console.log(err);
      
    })
    }
  }

  deleteProduct(){
    if(!confirm('Are you sure you want to delete this product?'))
    return;
    console.log(this.productId);
    
    this.prodService.delete(this.productId).subscribe((res)=>{
      console.log(res);
      
      this.router.navigate(['/admin/products'])

    },(err:HttpErrorResponse)=>{
      console.log(err);
      
    });
  }

}