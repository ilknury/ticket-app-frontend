import { ApiService } from './../../api.service';
import { AuthService } from './../../auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'create-ticket',
  templateUrl: './create-ticket.component.html',
})
export class CreateTicketComponent implements OnInit {
  public isPageLoaded: boolean = false;

  public category: string = '';
  public title: string = '';

  public error: string = '';
  public isSubmitting: boolean = false;

  // all categories for selectbox
  public categories: any = [];

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}
  ngOnInit() {
    this.apiService.getCategories().subscribe((res) => {
      if (res.status === 200) {
        this.categories = res.data;
        this.isPageLoaded = true;
      } else {
        this.categories = [];
        this.isPageLoaded = true;
        alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      }
    });
  }

  changeDepartment(event: any) {
    this.category = event.target.value;
  }

  createTicket(form: NgForm) {
    this.error = '';
    this.isSubmitting = true;
    if (form.valid && this.category !== '') {
      const user = this.apiService.currentUser.value?._id || '';
      const department = this.apiService.currentUser.value?.department || '';
      if (user === '' || department === '') {
        this.router.navigate(['/login']);
      }else{
        this.apiService.createTicket(user, department, this.category, this.title).subscribe((res) => {
          if (res.status === 200) {
            alert('Sorunuz başarıyla oluşturuldu. En kısa sürede cevaplanacaktır.');
            this.router.navigate(['/sorularim']);
          } else {
            this.error = res.message;
            this.isSubmitting = false;
          }
        });
      }

    } else {
      this.error = 'Lütfen tüm alanları doldurun!';
      this.isSubmitting = false;
    }
  }
}
