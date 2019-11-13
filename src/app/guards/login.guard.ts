import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private data: DataService, public router: Router) {

  }
  canActivate(): boolean {
    if (!this.data.isLogged) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
