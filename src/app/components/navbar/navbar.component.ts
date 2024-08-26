import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../shared/services/authentication/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  isLogin: boolean = true;

  ngOnInit(): void {
    this._AuthService.decodedData.subscribe(() => {
      if (this._AuthService.decodedData.getValue() !== null) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  }

  logOut(): void {
    localStorage.removeItem('userToken');
    this._AuthService.decodedData.next(null);
    this._Router.navigate(['/login']);
  }
}
