import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { HomeComponent } from './home/home.component';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { FormsModule } from '@angular/forms';
import { FaqComponent } from './faq/faq.component';


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    MyTicketsComponent,
    CreateTicketComponent,
    FaqComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,
  ],
  exports: [
    HomeComponent
  ]
})
export class StudentModule { }
