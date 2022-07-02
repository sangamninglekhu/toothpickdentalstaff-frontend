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
import { BookingformComponent } from './_components/bookingform/bookingform.component';
import { SignupformNurseComponent } from './_components/signupform-nurse/signupform-nurse.component';
import { SignupformPracticeComponent } from './_components/signupform-practice/signupform-practice.component';
import { CareerformComponent } from './_components/careerform/careerform.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptorProvider } from './_interceptors/auth.interceptor';
import { LogoutComponent } from './_pages/logout/logout.component';
import { VerifyemailComponent } from './_pages/verifyemail/verifyemail.component';
import { TeamComponent } from './_pages/team/team.component';

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
    CareerComponent,
    BookingformComponent,
    SignupformNurseComponent,
    SignupformPracticeComponent,
    CareerformComponent,
    LogoutComponent,
    VerifyemailComponent,
    TeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
