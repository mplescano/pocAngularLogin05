import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {delay, dematerialize, materialize, mergeMap} from 'rxjs/operators';


export class FakedBackendInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // array in local storage for registered users
    let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    // wrap in delayed observable to simulate server api call

    return of(null).pipe(mergeMap(() => {

        // authenticate
        if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
          // find if any user matches login credentials
          let filteredUsers = users.filter(user => {
            return user.username === request.body.username && user.password === request.body.password;
          });

          if (filteredUsers.length > 0) {
            // if login details are valid return 200 OK with user detail and fake jwt token
            let user = filteredUsers[0];
            let body = {
              id: user.id,
              username: user.username,
              password: user.password,
              firstName: user.firstName,
              lastName: user.lastName,
              token: 'fake-jwt-token'
            };
            return of(new HttpResponse({status: 200, body: body}));
          } else {
            //return throwError({error: {message: 'Username or password is incorrect'}});
            return throwError('Username or password is incorrect');
          }
        }

        // register user
        if (request.url.endsWith('/users/register') && request.method === 'POST') {
          // get new user object from post body
          let newUser = request.body;

          // validation
          let duplicateUser = users.filter(user => {
            return user.username === newUser.username;
          }).length;

          if (duplicateUser) {
            return throwError('Username "' + newUser.username + '" is already taken');
          }

          // save new user
          newUser.id = users.length + 1;
          users.push(newUser);
          localStorage.setItem('users', JSON.stringify(users));

          // respond 200 OK
          return of(new HttpResponse({status: 200}));
        }

        return next.handle(request);
      }
    ))
      // call materialize and dematerialize to ensure delay even if an error is thrown
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }

}
