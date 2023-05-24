import { ApiService } from './../../api.service';
import { AuthService } from './../../auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  public isPageLoaded: boolean = false;

  public studentNumber: string = '';
  public fullName: string = '';
  public department: string = '';
  public phoneNumber: string = '';
  public email: string = '';
  public password: string = '';
  public error: string = '';
  public isSubmitting: boolean = false;

  // all departments for selectbox
  public departments: any = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService
  ) {}
  ngOnInit() {
    // get the current user
    this.apiService.checkToken().subscribe((res) => {
      if (res.status === 200) {
        if (res.user.userType === 1) {
          this.router.navigate(['/']);
        } else if (res.user.userType === 5) {
          this.router.navigate(['/manager/sorular']);
        }
      } else {
        this.apiService.getDepartments().subscribe((res) => {
          if (res.status === 200) {
            this.departments = res.data;
            this.isPageLoaded = true;
          } else {
            this.departments = [];
            this.isPageLoaded = true;
            alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
          }
        });
      }
    });
  }

  changeDepartment(event: any) {
    this.department = event.target.value;
  }

  registerStudent(form: NgForm) {
    this.error = '';
    this.isSubmitting = true;
    if (form.valid && this.department !== '') {
      this.apiService
        .registerStudent(
          this.studentNumber,
          this.fullName,
          this.department,
          this.phoneNumber,
          this.email,
          this.password
        )
        .subscribe((res) => {
          if (res.status === 200) {
            alert(
              'Kayıt başarılı. Lütfen mail adresinize gelen aktivasyon linkine tıklayarak hesabınızı aktif edin.'
            );
            this.router.navigate(['/login']);
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
