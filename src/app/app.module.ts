import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './_pages/home/home.component';
import { AboutComponent } from './_pages/about/about.component';
import { SigninComponent } from './_pages/signin/signin.component';
import { SignupComponent } from './_pages/signup/signup.component';
import { BookComponent } from './_pages/book/book.component';
import { ContactComponent } from './_pages/contact/contact.component';
import { SignupNurseComponent } from './_pages/signup-nurse/signup-nurse.component';
import { SignupPracticeComponent } from './_pages/signup-practice/signup-practice.component';
import { ResetpasswordComponent } from './_pages/resetpassword/resetpassword.component';
import { CareerComponent } from './_pages/career/career.component';

import { HeaderComponent } from './_components/header/header.component';
import { FooterComponent } from './_components/footer/footer.component';
import { JobopeningsComponent } from './_components/jobopenings/jobopenings.component';
import { ForgetpasswordComponent } from './_components/forgetpassword/forgetpassword.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    SigninComponent,
    SignupComponent,
    BookComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    SignupNurseComponent,
    SignupPracticeComponent,
    ForgetpasswordComponent,
    JobopeningsComponent,
    ResetpasswordComponent,
    CareerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
