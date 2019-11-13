import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { User } from '../models/user-model';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  basePath = 'http://localhost:3000/user';
  // https://www.freakyjolly.com/ionic-4-httpclient-crud-service-tutorial-to-consume-restful-server-api/#more-2792

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  createUser(item): Observable<any> {
    return this.http
      .post<User>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getUser(correo, pass): Observable<any> {
    const credentials = {
      correo: correo,
      pass: pass
    };
    return this.http
      .post<User>(this.basePath, JSON.stringify(credentials), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getItem(id): Observable<any> {
    return this.http
      .get<User>(this.basePath + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getList(): Observable<any> {
    return this.http
      .get<User>(this.basePath)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  updateItem(id, item): Observable<any> {
    return this.http
      .put<User>(this.basePath + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  deleteItem(id) {
    return this.http
      .delete<User>(this.basePath + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
}
