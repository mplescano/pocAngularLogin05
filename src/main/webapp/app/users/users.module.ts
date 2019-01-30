import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from './user.service';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { AgGridModule } from 'ag-grid-angular';
import {UsersRoutingModule} from './users-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    AgGridModule.withComponents([])
  ],
  declarations: [
    UserListComponent,
    UserFormComponent
  ],
  exports: [
    UserListComponent,
    UserFormComponent
  ],
  providers: [
    UserService
  ]
})
export class UsersModule { }
