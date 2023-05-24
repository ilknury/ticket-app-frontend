import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'manager-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  openMobileMenu = false;

  constructor(private authService: AuthService, private router: Router) {}

  toggleMobileMenu() {
    this.openMobileMenu = !this.openMobileMenu;
  }

  logoutPersonnel() {
    if(confirm('Çıkış yapmak istediğinize emin misiniz?')){
      this.authService.logOut().subscribe((success) => {
        if (success) {
          this.router.navigate(['/personnel-login']);
        }
      });
    }
  }
}
