import { StudentModule } from './student/student.module';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';

import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './auth/register/register.component';
import { PersonnelLoginComponent } from './auth/personnel-login/personnel-login.component';
import { HttpClientModule } from '@angular/common/http';
import { VerfiyEmailComponent } from './verfiy-email/verfiy-email.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PersonnelLoginComponent,
    VerfiyEmailComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, StudentModule],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
