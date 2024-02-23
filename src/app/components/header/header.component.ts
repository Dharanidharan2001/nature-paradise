import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { SharedService } from '../../service/shared.service';
import { ProductService } from '../../service/product.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;
  menuitems: MenuItem[] | undefined;
  avatarLabel: string = '';
  visible: boolean = false;
  sidebarVisible: boolean = false;
  NameDetails: any
  EmailDetails: any;



  logout(): void {
    this.router.navigate(['/login']);
  }

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private productService: ProductService
  ) {
    this.loginmenu(Response);
  }

  ngOnInit() {
    this.menu();
    this.loginDetails();

  }

  loginDetails() {
    this.sharedService.userResponse$.subscribe(response => {
      if (response) {
        console.log("🚀 ~ DashboardComponent ~ loginDetails ~ loginDetails: ----->>>>", response);
        this.avatarLabel = response.userDetails.email[0].toUpperCase();
        this.loginmenu(response);
      }
    });
  }

  loginmenu(response: any): void {
    if (response && response.userDetails) {
      this.menuitems = [
        {
          items: [
            {
              label: response.userDetails.name
            },
            {
              label: response.userDetails.email
            },
            {
              label: 'logOut',
              icon: 'pi pi-fw pi-power-off',
              command: () => this.logout()
            }
          ]
        }
      ];
    } else {
      this.menuitems = [
        {
          items: [
            {
              label: 'logOut',
              icon: 'pi pi-sign-out',
              command: () => this.logout()
            }
          ]
        }
      ]
    }
  }


  menu() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
          this.router.navigate(['/dashboard']);
          setTimeout(()=>{
            this.refreshPage();
         },10)
        }

      },
      {
        label: 'Products',
        icon: 'pi pi-shopping-cart',
        items: [
          {
            label: 'All',
            command: () => {
              this.router.navigate(['/dashboard']);
              setTimeout(()=>{
                this.fetchProducts('all')
             },10)
            }

          },
          {
            label: 'Bonsai',  
            command: () => {
              this.router.navigate(['/dashboard']);
              setTimeout(()=>{
                this.fetchProducts('bonsai')
              },10)
            } 
          },
          {
            label: 'Flower Sapling',
            command: () => {
              this.router.navigate(['/dashboard']);
              setTimeout(()=>{
                this.fetchProducts('flower-saplings')
              },10)
            }
          },
          {
            label: 'Fruit Sapling',
            command: () => {
              this.router.navigate(['/dashboard']);
              setTimeout(()=>{
                this.fetchProducts('fruit-saplings')
              },10)
            }
          },
          {
            label: 'OrganicManure',
            command: () => {
              this.router.navigate(['/dashboard']);
              setTimeout(()=>{
                this.fetchProducts('organic-manure')
              },10)
            }
          },
          {
            label: 'Gardening Tools',
            command: () => {
              this.router.navigate(['/dashboard']);
              setTimeout(()=>{
                this.fetchProducts('gardening-tools')
              },10)
            }
          },
          {
            label: 'Vegetable Saplings',
            command: () => {
              this.router.navigate(['/dashboard']);
              setTimeout(()=>{
                this.fetchProducts('vegetable-saplings')
              },10)
            }
          },
          {
            label: 'Fruit Seeds',
            command: () => {
              this.router.navigate(['/dashboard']);
              setTimeout(()=>{
                this.fetchProducts('fruit-seeds')
              },10)
            }
          },
          {
            label: 'Vegetables Seeds',
            command: () => {
              this.router.navigate(['/dashboard']);
              setTimeout(()=>{
                this.fetchProducts('vegetable-seeds')
              },10)
            }
          }
        ]
      },
      {
        label: 'About Us',
        icon: 'pi pi-fw pi-user',
        command:() => this.router.navigate(['/about'])
      },
      {
        label: 'Contacts',
        icon: 'pi pi-fw pi-calendar',
          command:() => this.router.navigate(['/contact'])
      },
      {
        label: 'FeedBack',
        icon: 'pi pi-fw pi-power-off',
        // command:() => {
        //   this.sidebarVisible = true;
        // }

        command:() => this.router.navigate(['/feedback'])
      }
    ];
  }

  private fetchProducts(category: string): void {
    this.productService.fetchProducts(category);
    this.productService.products$.subscribe(
      (products) => {
        console.log(products)
      },
      (error) => {
        console.error("Error fetching products:", error);
      }
    );
  }

  refreshPage() {
    // Use window.location.reload() to reload the current page
    window.location.reload();
  }

}
