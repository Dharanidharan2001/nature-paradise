import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SharedService } from '../../service/shared.service';
import { ProductService } from '../../service/product.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [MessageService]
})
export class DashboardComponent  implements OnInit{
  constructor(private router: Router, private sharedService: SharedService, private messageService: MessageService, private productService: ProductService,private route: ActivatedRoute ) {}

  allProducts: any[] = [];
  bonsaiProducts: any[] = [];
  flowerSaplingProducts: any[] = [];
  isHomeRoute: boolean = false;
  



  logout(): void {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {

    // Subscribe to the products$ observable to update products when changes occur
    this.productService.products$.subscribe(products => {
      // Update products in the component
      this.allProducts = products;
      // console.log('dharnai doubt ---->',products);

      // Filter products for specific categories if needed
      this.bonsaiProducts = this.filterProductsByCategory(products, 'bonsai');
      this.flowerSaplingProducts = this.filterProductsByCategory(products, 'flower-saplings');
    });


    this.loginIn();
  }


  private filterProductsByCategory(products: any[], category: string): any[] {
    return products.filter(product => product.category === category);
  }


  loginIn(){
    this.sharedService.successMessage$.subscribe(message => {
      if (message) {
        setTimeout(() => {
          // this.loginDetails();
          this.sharedService.setSuccessMessage('');
          this.messageService.add({ severity: 'success', summary: 'Login Success', detail: 'You successfully logined' });
        }, 1000);
      }
    });
  }


  navigateToProductDetails(productId: number): void {
    console.log('my doubt---->',productId)
    if (productId !== undefined && productId !== null) {
      // Use the router to navigate to the product details page
      this.router.navigate(['productdetails', productId]);
    } else {
      console.error('Invalid productId. Cannot navigate to product details.');
    }
  }


}
