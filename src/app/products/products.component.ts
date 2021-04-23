import { CategoryService } from './../services/category.service';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:Product[] = []
  filteredProducts:Product[] = []
  categories$;
  category:any=''
  constructor(private prodService:ProductService, private categoryService:CategoryService, private route: ActivatedRoute) {
    prodService.getAll().subscribe((products)=>{
      this.products = products
        route.queryParamMap.subscribe((params)=>{
      this.category = params.get('category');
      console.log(this.category);
    })
      this.filteredProducts = (this.category)?this.products.filter((p:any)=>{
        
          return  p.category.name === this.category
          
      }): this.products
    });
    this.categories$ = categoryService.getAllCategories()

  
   }

  

  ngOnInit(): void {
    // this.filteredProducts
  }

}
