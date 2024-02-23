import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:3000'; // Replace with your actual backend API URL
  private productsSubject = new BehaviorSubject<any[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchProducts(category: string): void {
    // Make API call based on category and update the products subject
    this.http.get<any>(`${this.baseUrl}/products/${category}`).subscribe(
      (data) => this.productsSubject.next(data),
      (error) => console.error('Error fetching products:', error)
    );
  }

  fetchProductDetails(productId: number): Observable<any> {
    // Make API call to get details of a specific product
    return this.http.get<any>(`${this.baseUrl}/products/${productId}`);
  }
}
