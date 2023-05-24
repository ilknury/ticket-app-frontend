import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private apiService: ApiService) {}


  // Student login
  authenticateStudent(email: string, password: string): Observable<any> {
    return this.apiService.loginStudent(email, password);
  }

  logOut(): Observable<any> {
    this.apiService.currentUser.next(null);
    localStorage.removeItem('tokenYek');
    localStorage.removeItem('userType');
    return of(true);
  }

  // Personnel login
  authenticatePersonnel(email: string, password: string): Observable<any> {
    return this.apiService.loginPersonnel(email, password);
  }

}
