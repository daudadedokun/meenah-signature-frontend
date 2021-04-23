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
  invalidForm:any = false
  selectedFile:any

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

  onFileSelected(evt:any){
    this.selectedFile  = evt.target.files[0]
    console.log(this.selectedFile);
    
  }

  onFileUpload(productdId:any){
    const formData =  new FormData()
    formData.append('file', this.selectedFile)
    this.prodService.uploadImage(productdId,formData).subscribe((res)=>{
      console.log(res);
      
    },(err:HttpErrorResponse)=>{
      console.log(err);
      
    })
  }

  downloadProductImage(){
    console.log(this.productId);
    
    this.prodService.downloadImage(this.productId).subscribe((res)=>{
      console.log(res);
      
    },(err:HttpErrorResponse)=>{
      console.log(err);
      
    })
  }


  save(product:any){
    
    if(this.productId){
      this.prodService.update(product,product.category).subscribe((res)=>{
        // console.log(res);
        
        this.onFileUpload(product.id);
        this.router.navigate(['/admin/products'])
      },(err)=>{
        this.invalidForm = true;
      })
    }
       
      else {
        this.prodService.create(product,product.category)
  
      .subscribe((res:any)=>{
      this.router.navigate(['/admin/products'])

        this.products$ = res
        
    },(err:HttpErrorResponse)=>{
      this.invalidForm = true;
      
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
      this.invalidForm = true;
    })
    }
  }

  deleteProduct(){
    if(!confirm('Are you sure you want to delete this product?'))
    return;
    
    this.prodService.delete(this.productId).subscribe((res)=>{
      
      this.router.navigate(['/admin/products'])

    },(err:HttpErrorResponse)=>{
      this.invalidForm = true;
      
    });
  }

}