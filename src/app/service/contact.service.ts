// contact.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class contactService {

  private apiUrl = 'http://localhost:3000/contactus';

  constructor(private http: HttpClient) { }
  
  

  postcontact(contactdetails:any): Observable<any> {
    return this.http.post<any>(this.apiUrl, contactdetails);
  }

  // const payload = {
    //     name,
    //     email,
    //     phonenumber,
    //     message
    //   };
}

