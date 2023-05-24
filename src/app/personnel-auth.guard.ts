import { ApiService } from './api.service';
import { Observable, map, filter } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PersonnelAuthGuard implements CanActivate {
  constructor(private router: Router, private apiService: ApiService) {}

  canActivate(): Observable<boolean> {
    return this.apiService.currentUser.pipe(
      filter((currentUser) => currentUser !== undefined),
      map((currentUser) => {
        if (currentUser) {
          if (currentUser.userType === 1) {
            this.router.navigate(['/']);
            return false;
          }
          return true;
        } else {
          this.router.navigate(['/personnel-login']);
          return false;
        }
      })
    );
  }
}
