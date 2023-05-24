import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { TicketsComponent } from './tickets/tickets.component';
import { NavbarComponent } from './navbar/navbar.component';

import { FormsModule } from '@angular/forms';
import { AnalyticComponent } from './analytic/analytic.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { SingleTicketComponent } from './single-ticket/single-ticket.component';





@NgModule({
  declarations: [
    ManagerComponent,
    TicketsComponent,
    NavbarComponent,
    AnalyticComponent,
    SingleTicketComponent,
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    FormsModule,
    NgApexchartsModule,
  ]
})
export class ManagerModule { }
