import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { PersonnelLoginComponent } from './auth/personnel-login/personnel-login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PersonnelAuthGuard } from './personnel-auth.guard';
import { VerfiyEmailComponent } from './verfiy-email/verfiy-email.component';


const routes: Routes = [
  { path: '', loadChildren: () => import('./student/student.module').then(m => m.StudentModule), canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'verify-email/:id/:token', component: VerfiyEmailComponent},
  { path: 'personnel-login', component: PersonnelLoginComponent},
  { path: 'manager', loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule), canActivate: [PersonnelAuthGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
