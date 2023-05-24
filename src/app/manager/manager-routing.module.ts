import { AnalyticComponent } from './analytic/analytic.component';
import { TicketsComponent } from './tickets/tickets.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleTicketComponent } from './single-ticket/single-ticket.component';

const routes: Routes = [
  { path: '', redirectTo: 'sorular', pathMatch: 'full'},
  { path: 'analitik', pathMatch: 'full', component: AnalyticComponent},
  { path: 'sorular', component: TicketsComponent },
  { path: 'sorular/:id', component: SingleTicketComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
