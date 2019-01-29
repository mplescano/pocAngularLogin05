import { Component } from '@angular/core';
import {User} from './users/User';
import {Router} from '@angular/router';
import {AuthenticationService} from './users/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;

  constructor(private router: Router,
              private authService: AuthenticationService) {
    this.authService.currentUserObservable.subscribe(userEvent => {
      this.currentUser = userEvent;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
