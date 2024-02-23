import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ProductDetailsComponent } from './productdetail/productdetail.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'about', component:AboutusComponent},
  { path: 'feedback',component:FeedbackComponent},
  { path: 'contact', component:ContactsComponent},
  { path: '',component: DashboardComponent},
  { path: 'product/:id', component: ProductDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
