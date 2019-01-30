import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './parts/home/home.component';
import {LoginComponent} from './parts/login/login.component';
import {RegisterComponent} from './parts/register/register.component';
import {AuthguardService} from './auth/authguard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [
      AuthguardService
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  // otherwise redirect to home
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
