import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/services/authentication/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  //^---------Global Property---------^//
  isLoading: boolean = false;
  //^---------Global Property---------^//

  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
    age: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(1[89]|[2-9]\d+)$/),
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
  });

  sendRegisterData(): void {
    this.isLoading = true;
    this._AuthService.setRegisterData(this.registerForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        this._Router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
}
