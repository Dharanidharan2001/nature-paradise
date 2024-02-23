import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { SharedService } from '../../service/shared.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent {

  credentials = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient, 
             private router: Router,
             private messageService: MessageService, 
             private sharedService: SharedService) {}

  onSubmit(): void {
    this.http.post<any>('http://localhost:3000/loginUser', this.credentials)
      .subscribe(
        response => {
          console.log("🚀 ~ LoginComponent ~ onSubmit ~ response:", response);
          this.sharedService.setUserResponse(response);
          this.sharedService.setSuccessMessage('You successfully logged in');
          if (response.redirectTo) {
            this.router.navigate([response.redirectTo]);
          }
        },
        error => {
          this.messageService.clear();
          this.messageService.add({ severity: 'error', summary: 'Error Login', detail: 'Invalid Login Check your details' });
        }
      );
    }

}
