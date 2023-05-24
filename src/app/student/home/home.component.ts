import { ApiService } from './../../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  categories: any[] = [];
  isPageLoaded: boolean = false;
  
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
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
}
