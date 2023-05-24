import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'single-ticket',
  templateUrl: './single-ticket.component.html',
})
export class SingleTicketComponent implements OnInit {
  isPageLoaded: boolean = false;
  ticketId: string = '';
  ticket: any = {};
  error: string = '';


  answer: string = '';
  isSubmitting: boolean = false;
  answerTicket(form: NgForm) {
    this.error = '';
    this.isSubmitting = true;
    if (form.valid && this.answer !== '') {

      this.apiService.answerTicket(this.ticket, this.answer).subscribe(res =>{

        if (res.status === 200) {
          alert('Talep başarıyla cevaplandı');
          this.router.navigate(['/manager/sorular']);
        } else {
          this.error = "Talep cevaplanırken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz."
          this.isSubmitting = false;
        }
      });
     
    } else {
      alert('Lütfen tüm alanları doldurun!');
      this.isSubmitting = false;
    }
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    // get ticket id from url
    this.ticketId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    if (this.ticketId === '') {
      // if there is no ticket id in url, redirect to tickets page
      this.router.navigate(['/manager/sorular']);
    } else {
      // else, get ticket from server
      this.apiService
        .getTicketById(this.ticketId)
        .subscribe(
          (res: any) => {
            if (res.status === 200) {
              this.ticket = res.data;
              if (this.ticket.isAnswered) {
                this.router.navigate(['/manager/sorular']);
              }
            } else {
              if (res.status === 404) {
                this.router.navigate(['/manager/sorular']);
              } else {
                this.error =
                  'Talep detayları alınamadı. Lütfen daha sonra tekrar deneyiniz.';
              }
            }
          },
          (err: any) => {
            this.error =
              'Talep detayları alınamadı. Lütfen daha sonra tekrar deneyiniz.';
          }
        )
        .add(() => {
          this.isPageLoaded = true;
        });
    }
  }
}
