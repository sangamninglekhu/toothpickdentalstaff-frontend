import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { IsAuthenticatedGuard } from './_guards/is-authenticated.guard';
import { HasRoleGuard } from './_guards/has-role.guard';
import { LogoutComponent } from './_pages/logout/logout.component';
import { VerifyemailComponent } from './_pages/verifyemail/verifyemail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [IsAuthenticatedGuard, HasRoleGuard],
    data: {
      role: 1
    }
  },
  {
    path: 'career',
    component: CareerComponent,

  },
  // {
  //   path: 'career',
  //   component: CareerComponent,
  //   canActivate: [IsAuthenticatedGuard, HasRoleGuard],
  //   data: {
  //     role: 'Pirate'
  //   }

  // },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'verifyemail',
    component: VerifyemailComponent
  },
  {
    path: 'signup',
    component: SignupPracticeComponent
  },
  {
    path: 'signuppractice',
    component: SignupPracticeComponent
  },
  {
    path: 'signupnurse',
    component: SignupNurseComponent
  },
  {
    path: 'resetpassword',
    component: ResetpasswordComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  // {
  //   path: 'about',
  //   component: AboutComponent
  // },
  // {
  //   path: 'book',
  //   component: BookComponent
  // },
  // {
  //   path: 'career',
  //   component: CareerComponent
  // },
  // {
  //   path: 'applyJob',
  //   component: JobapplyComponent
  // },
  // {
  //   path: 'contact',
  //   component: ContactComponent
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
