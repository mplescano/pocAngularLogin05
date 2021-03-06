import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../users/User';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../../auth/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(private authService: AuthenticationService) {
    this.currentUserSubscription = this.authService.currentUserObservable.subscribe(user => {
      console.log('Home user:', user);
      this.currentUser = user;
    });
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }



}
