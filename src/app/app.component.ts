import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.checkToken().subscribe((res) => {
      // this.apiService.currentUser.next(res.user);
    });
  }
  title = 'ticket-system';
}
