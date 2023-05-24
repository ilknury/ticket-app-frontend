import { Component, OnInit } from '@angular/core';
import { ApexChart, ApexLegend, ApexNonAxisChartSeries } from 'ng-apexcharts';
import { ApiService } from 'src/app/api.service';

import { combineLatest, forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-analytic',
  templateUrl: './analytic.component.html',
})
export class AnalyticComponent implements OnInit {
  isPageLoaded: Boolean = false;
  chartsData: any = [];
  totals: any = [];
  totalTicketsByCategory: any = [];

  // Chart labels
  legend: ApexLegend = {
    show: true,
    position: 'bottom',
    fontSize: '12px',
    labels: {
      colors: ['#fff'],
    },
  };

  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    combineLatest({
      totalStudentsByDepartment: this.apiService.totalStudentsByDepartment(),
      totalTicketsByDepartment: this.apiService.totalTicketsByDepartment(),
      totalTicketsByCategory: this.apiService.totalTicketsByCategory(),

      totalTickets: this.apiService.totalTickets(),
      totalPersonnels: this.apiService.totalPersonnels(),
      totalStudents: this.apiService.totalStudents(),
      averageTicketAnswerTime: this.apiService.averageTicketAnswerTime(),
    })
      .pipe(
        map((data) => {
          const chartsData = [
            {
              title: 'Bölümlere Göre Öğrenci Dağılımı',
              chart: {
                type: 'pie',
              },
              series: data.totalStudentsByDepartment.data.map(
                (item: any) => item.count
              ),
              labels: data.totalStudentsByDepartment.data.map(
                (item: any) => item.department
              ),
            },
            {
              title: 'Bölümlere Göre Talep Dağılımı',
              chart: {
                type: 'pie',
              },
              series: data.totalTicketsByDepartment.data.map(
                (item: any) => item.count
              ),
              labels: data.totalTicketsByDepartment.data.map(
                (item: any) => item.department
              ),
            },
            {
              title: 'Kategorilere Göre Talep Dağılımı',
              chart: {
                type: 'pie',
              },
              series: data.totalTicketsByCategory.data.map(
                (item: any) => item.count
              ),
              labels: data.totalTicketsByCategory.data.map(
                (item: any) => item.category
              ),
            },
          ];
          return {
            chartsData,
            totalTickets: data.totalTickets.data,
            totalPersonnels: data.totalPersonnels.count,
            totalStudents: data.totalStudents.data,
            averageTicketAnswerTime: data.averageTicketAnswerTime.data,
            totalTicketsByCategory: data.totalTicketsByCategory.data
          }
        })
      )
      .subscribe((data) => {
        this.chartsData = data.chartsData;
        this.totals = [
          {
            title: 'Toplam Talep',
            value: data.totalTickets.total,
            icon: 'confirmation_number',
          },
          {
            title: 'Cevaplanan Talep',
            value: data.totalTickets.answered,
            icon: 'done_all',
          },
          {
            title: 'Cevaplanmamış Talep',
            value: data.totalTickets.unanswered,
            icon: 'hourglass_top',
          },
          {
            title: 'Toplam Personel',
            value: data.totalPersonnels,
            icon: 'groups',
          },
          {
            title: 'Toplam Öğrenci',
            value: data.totalStudents.total,
            icon: 'school',
          },
          {
            title: 'Aktif Öğrenci',
            value: data.totalStudents.verified,
            icon: 'how_to_reg',
          },
          {
            title: 'Pasif Öğrenci',
            value: data.totalStudents.unverified,
            icon: 'person_off',
          },
          {
            title: 'Ortalama Yanıt Süresi',
            value: data.averageTicketAnswerTime.averageTimeInHours + ' saat',
            icon: 'avg_time',
          },
          {
            title: 'Personel Başına Talep',
            value: data.totalTickets.averageTicketPerPersonnel,
            icon: 'psychology_alt',
          }
        ];
        this.totalTicketsByCategory = data.totalTicketsByCategory;
        this.isPageLoaded = true;
      });
  }
}
