// shared.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private successMessageSource = new BehaviorSubject<string>('');
  successMessage$ = this.successMessageSource.asObservable();

  private userResponseSource = new BehaviorSubject<any>(null);
  userResponse$ = this.userResponseSource.asObservable();

  

  constructor(private http:HttpClient) {
    // Retrieve user details from localStorage on service initialization
    const storedUserResponse = localStorage.getItem('userResponse');
    if (storedUserResponse) {
      this.userResponseSource.next(JSON.parse(storedUserResponse));
    }
  }

  setSuccessMessage(message: string): void {
    this.successMessageSource.next(message);
  }

  // Store user details in localStorage and update the observable
  setUserResponse(response: any): void {
    localStorage.setItem('userResponse', JSON.stringify(response));
    this.userResponseSource.next(response);
  }
  
  // setfeedback(data:string):Observable<any>{
  //   return  this.http.post<any>('http://127.0.0.1:3000/feedback',data);
  // }
}
