import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import data from '../../assets/services/data.json';
import success from '../../assets/services/success.json';
import error from '../../assets/services/error.json';

@Injectable({
  providedIn: 'root'
})
export class UserMockService {

  users = [];
  constructor(private http: HttpClient) {
    for (let i in data.user) {
      this.users.push(data.user[i]);
    }
  }

  createUser(item): Observable<any> {

    item.id = this.users.length + 1;
    this.users.push(JSON.parse(JSON.stringify(item)));
    console.log(this.users[5]);
    return new Observable(observer => {
      observer.next(success);
      observer.complete();
      observer.error(Error);
    });
  }

  getUser(correo, pass): Observable<any> {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].correo === correo && this.users[i].pass === pass) {
        return this.http
          .get('../../assets/services/success.json');
      }
    }
    return this.http
      .get('../../assets/services/error.json');
  }

  getItem(id): Observable<any> {
    console.log(id);
    for (let i = 0; i < this.users.length; i++) {
      console.log(this.users[i].id);
      if (this.users[i].id === id) {
        return new Observable(observer => {
          observer.next(this.users[i]);
          observer.complete();
          observer.error(Error);
        });
      }
    }
    return this.http
      .get('../../assets/services/error.json');
  }

  getList(): Observable<any> {
    return new Observable(observer => {
      observer.next(this.users);
      observer.complete();
      observer.error(Error);
    });
  }

  updateItem(id, item): Observable<any> {
    for (let i = 0; i < this.users.length; i++) {
      console.log(this.users[i].id);
      if (this.users[i].id === id) {
        this.users[i] = JSON.parse(JSON.stringify(item));
        return this.http
          .get('../../assets/services/success.json');
      }
    }
    return this.http
      .get('../../assets/services/error.json');
  }

  deleteItem(id) {
    console.log(this.users.length);
    for ( var i = 0; i < this.users.length; i++) {
      if ( this.users[i].id === id) {
        this.users.splice(i, 1);
        console.log(this.users.length);
        return this.http
          .get('../../assets/services/success.json');
      }
    }
    return this.http
      .get('../../assets/services/error.json');
  }
}
