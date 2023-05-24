import { ApiService } from './../../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-tickets',
  templateUrl: './my-tickets.component.html',
})


export class MyTicketsComponent implements OnInit{
  constructor(private apiSevice: ApiService) {}
  public isLoaded = false;
  public tickets: any = [];


  ngOnInit() {
    this.apiSevice.getTicketsByStudent().subscribe((res) => {
      if (res.status === 200) {
        this.isLoaded = true;
        this.tickets = res.data;
      }
    });
  }

}
