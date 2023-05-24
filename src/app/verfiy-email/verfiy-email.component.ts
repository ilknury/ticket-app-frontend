import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'verfiy-email',
  templateUrl: './verfiy-email.component.html',
})
export class VerfiyEmailComponent implements OnInit {
  title: string = 'Email Doğrulama';
  studentId: string = '';
  token: string = '';
  message: string = '';
  isPageLoaded: boolean = false;
  isEmailVerified: boolean = false;

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.studentId = this.activatedRouter.snapshot.params['id'];
    this.token = this.activatedRouter.snapshot.params['token'];

    this.apiService.verifyEmail(this.studentId, this.token).subscribe((res) => {
      console.log('verifyRes: ', res);
      // if status is 404 redirect to 404 page
      if (res.status === 404) {
        this.router.navigate(['/404']);
      } else {
        if (res.status === 200) {
          this.isEmailVerified = true;
        }
        this.message = res.message;
        this.isPageLoaded = true;
      }
    });
  }
}
