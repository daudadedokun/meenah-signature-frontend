import { Product } from '../../model/Product';
import { ProductService } from './../../services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  
  products:Product[] = []
  filteredProducts:any[] = []
  constructor(public prodService: ProductService) { 
    
  }
  ngOnDestroy(): void {
    this.getAll()
  }

  onSearch(query:string){
    this.filteredProducts = (query)? this.products.filter((product)=>
     product.name.toLowerCase().includes(query)): this.products;
  }

  getAll(){
    this.prodService.getAll().subscribe((products)=>{
      this.products = this.filteredProducts = products;
    })
  }
  ngOnInit(): void {
    this.getAll();
  }

}
