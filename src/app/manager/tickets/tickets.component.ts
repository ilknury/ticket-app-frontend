import { NgForm } from '@angular/forms';
import { ApiService } from './../../api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tickets',
  templateUrl: './tickets.component.html',
})
export class TicketsComponent implements OnInit {
  constructor(private apiSevice: ApiService, private router: Router) {}
  public isLoaded = false;
  public tickets: any = [];

  ngOnInit() {
    this.apiSevice
      .getTicketsByDepartment()
      .subscribe((res) => {
        if (res.status === 200) {
          this.tickets = res.data;
        }
      })
      .add(() => {
        this.isLoaded = true;
      });
  }

  goToAnswerPage(ticketId: any) {
    this.router.navigate(['/manager/sorular', ticketId]);
  }
}
