import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './user-list/user-list.component';
import {UserFormComponent} from './user-form/user-form.component';
import {AuthguardService} from '../auth/authguard.service';

const usersRoutes: Routes = [
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [
      AuthguardService
    ]
  },
  {
    path: 'users/form',
    component: UserFormComponent,
    canActivate: [
      AuthguardService
    ]
  },
  {
    path: 'users/form/:id',
    component: UserFormComponent,
    canActivate: [
      AuthguardService
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(usersRoutes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
