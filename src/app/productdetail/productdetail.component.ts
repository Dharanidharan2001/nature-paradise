import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrl: './productdetail.component.css'
})
export class ProductDetailsComponent implements OnInit {

  product: any;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    // const productId = +this.route.snapshot.paramMap.get('id')!;
    const productId = this.route.snapshot.paramMap.has('id')
    ? +this.route.snapshot.paramMap.get('id')!
    : null;

    // Fetch the product details based on productId
    if (productId !== null && productId !== undefined) {
      // Fetch the product details based on productId
      this.productService.fetchProductDetails(productId).subscribe(
        (data) => this.product = data,
        (error) => console.error('Error fetching product details:', error)
      );
    } else {
      console.error('Product ID is null or undefined');
    }
  }
  
}
