import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';


// primeng
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';
import { RegisterComponent } from './components/register/register.component';
import { SidebarModule } from 'primeng/sidebar';
import { AboutusComponent } from './aboutus/aboutus.component';
import { DialogModule } from 'primeng/dialog';
import { FeedbackComponent } from './feedback/feedback.component';
import { ContactsComponent } from './contacts/contacts.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TopheaderComponent } from './components/topheader/topheader.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    AboutusComponent,
    FeedbackComponent,
    ContactsComponent,
    TopheaderComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    
    // primeng
    InputTextModule,
    PasswordModule,
    CardModule,
    ButtonModule,
    ToastModule,
    MenubarModule,
    AvatarModule,
    AvatarGroupModule,
    OverlayPanelModule,
    MenuModule,
    SidebarModule,
    DialogModule,
    InputTextareaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
