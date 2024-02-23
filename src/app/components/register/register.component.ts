// register.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent {

  userDetails = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private http: HttpClient, private router: Router, private messageService: MessageService) {}
  
  onSubmit(): void {
    console.log(this.userDetails);
  
    if (this.userDetails.password !== this.userDetails.confirmPassword) {
      this.messageService.clear();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Passwords do not match' });
      return;
    }
  
    this.http.post<any>('http://localhost:3000/createUser', this.userDetails)
      .subscribe({
        next: (response) => {
          this.messageService.clear();
          this.messageService.add({ severity: 'success', summary: 'Registration Success', detail: 'User registered successfully' });
          // if (response.redirectTo) {
          //   this.router.navigate([response.redirectTo]);
          // }
        },
        error: (error) => {
          this.messageService.clear();
          this.messageService.add({ severity: 'error', summary: 'Error Registration', detail: 'Registration failed. Please try again' });
        }
      });
  }
}
