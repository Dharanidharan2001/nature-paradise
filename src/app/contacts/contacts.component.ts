import { Component,OnInit } from '@angular/core';
import { SharedService } from '../service/shared.service';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { contactService } from '../service/contact.service';
import { response } from 'express';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
  providers:[MessageService,contactService]
})
export class ContactsComponent {

  contactvalue = {
    name:'',
    email:'',
    phonenumber:'',
    message:''
  }

  constructor(private http:HttpClient ,private contactService: contactService,private messageService : MessageService) { }

  submitcontact() {
    // this.http.post<any>('http://localhost:3000/contactus', this.contactvalue)
    // .subscribe(
    //   response => {
    //     console.log("🚀 ~ LoginComponent ~ onSubmit ~ response:", response);
    //     this.contactService.setUserResponse(response);
    //     this.contactService.setSuccessMessage('Your response has been sent in');
    //     // if (response.redirectTo) {
    //     //   this.router.navigate([response.redirectTo]);
    //     // }
    //   // },
    //   // error => {
    //   //   this.messageService.clear();
    //   //   this.messageService.add({ severity: 'error', summary: 'Error Login', detail: 'Invalid Login Check your details' });
    //   }
    // );

    const contactdetails = this.contactvalue;
    this.contactService.postcontact(contactdetails).subscribe(
      (response)=>{
        this.messageService.add({severity:'success',summary:'contact sent',detail:'your contact saved successfully'})
      },
      (error) =>{
        console.error('errot submitting the contact',error)
      }
      
    )


  }

}


          
          
