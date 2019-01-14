import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {NavigationStart, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject: Subject<any>;
  private keepAfterNavigationChange: boolean;

  constructor(private router: Router) {
    this.subject = new Subject<any>();
    this.keepAfterNavigationChange = false;

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next();
        }
      }
    });
  }


}
