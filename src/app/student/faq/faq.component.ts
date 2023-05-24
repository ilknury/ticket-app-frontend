import { ApiService } from './../../api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'faq',
  templateUrl: './faq.component.html',
})
export class FaqComponent implements OnInit {
  categoryId: string = '';
  category: string = '';
  faqs: any[] = [];
  isPageLoaded: boolean = false;

  constructor(private router: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.categoryId = this.router.snapshot.params['id'];

    this.apiService.getFaqsByCategory(this.categoryId).subscribe((res) => {
      if (res.status === 200) {
        this.faqs = res.data;

        if (this.faqs.length > 0) {
          this.category = this.faqs[0].category.name;
          this.isPageLoaded = true;
        } else {
          this.apiService.getCategoryById(this.categoryId).subscribe((res) => {
            if (res.status === 200) {
              this.category = res.category.name;
            } else {
              this.category = 'Hata';
            }
            this.isPageLoaded = true;
          });
        }
      } else {
        this.faqs = [];
        this.isPageLoaded = true;
        alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      }
    });
  }
}
