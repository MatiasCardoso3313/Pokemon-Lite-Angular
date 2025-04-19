import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { ProductInterface } from '../../interfaces/product.interface';

@Component({
  selector: 'products',
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  productList: ProductInterface[]=[];
  constructor(private productService: ProductService) { }
  ngOnInit(): void {
    this.getPokemon();
  }
  getPokemon() {
    this.productService.getPokemon().subscribe({
      next: (results) => {
        this.productList = results.results;
      },
      error: (err)=>{
        console.error(err);
      }
    })
  }
}