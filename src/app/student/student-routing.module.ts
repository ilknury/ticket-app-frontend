import { FaqComponent } from './faq/faq.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'sss/category/:id', component: FaqComponent },
  { path: 'sorularim', component: MyTicketsComponent },
  { path: 'soru-sor', component: CreateTicketComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
