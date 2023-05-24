///////////////////////////////

import { map } from 'rxjs';
import { ApiService } from './../../api.service';
import { AuthService } from './../../auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personnel-login',
  templateUrl: './personnel-login.component.html',
})
export class PersonnelLoginComponent implements OnInit {
  public isPageLoaded: boolean = false;

  public email: string = '';
  public password: string = '';
  public error: string = '';
  public isSubmitting: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    // get the current user
    this.apiService.checkToken().subscribe((res) => {
      if(res.status === 200){
        if (res.user.userType === 1) {
          this.router.navigate(['/']);
        }else if (res.user.userType === 5) {
          this.router.navigate(['/manager/sorular']);
        }
      }else{
        this.isPageLoaded = true;
      }
    });

  }

  loginPersonnel(form: NgForm) {
    this.error = '';
    this.isSubmitting = true;
    if (form.valid) {
      this.authService
        .authenticatePersonnel(this.email, this.password)
        .subscribe((res) => {
          if (res.status === 200) {
            this.apiService.checkToken().subscribe((res) => {
              // Set the current user if the token is valid
              this.router.navigate(['/manager/sorular']);
              this.isSubmitting = false;
            });
          } else {
            this.error = res.message;
            this.isSubmitting = false;
          }
        });
    } else {
      this.error = 'Lütfen tüm alanları doldurun!';
      this.isSubmitting = false;
    }
  }
}
