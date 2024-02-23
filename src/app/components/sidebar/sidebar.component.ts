import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.less'
})
export class SidebarComponent {

  constructor(private productService: ProductService, private router: Router) { }

  allProducts(){
    this.router.navigate(['/dashboard']);
    setTimeout(() => {
      this.fetchProducts('all')
    }, 10)
  }

  bonsai() {
    this.router.navigate(['/dashboard']);
    setTimeout(() => {
      this.fetchProducts('bonsai')
    }, 10)
  }

  FlowerSapling() {
    this.router.navigate(['/dashboard']);
    setTimeout(() => {
      this.fetchProducts('flower-saplings')
    }, 10)
  }

  FruitSapling() {
    this.router.navigate(['/dashboard']);
    setTimeout(() => {
      this.fetchProducts('fruit-saplings')
    }, 10)
  }

  OrganicManure() {
    this.router.navigate(['/dashboard']);
    setTimeout(() => {
      this.fetchProducts('organic-manure')
    }, 10)
  }

  GardeningTools(){
    this.router.navigate(['/dashboard']);
    setTimeout(()=>{
      this.fetchProducts('gardening-tools')
    },10)
  }

  VegetableSaplings() {
    this.router.navigate(['/dashboard']);
    setTimeout(()=>{
      this.fetchProducts('vegetable-saplings')
    },10)
  }

  FruitSeeds(){
    this.router.navigate(['/dashboard']);
    setTimeout(()=>{
      this.fetchProducts('fruit-seeds')
    },10)
  }

  VegetablesSeeds(){
    this.router.navigate(['/dashboard']);
    setTimeout(()=>{
      this.fetchProducts('vegetable-seeds')
    },10)
  }


  private fetchProducts(category: string): void {
    this.productService.fetchProducts(category);
    this.productService.products$.subscribe(
      (products) => {
      },
      (error) => {
        console.error("Error fetching products:", error);
      }
    );
  }

}
