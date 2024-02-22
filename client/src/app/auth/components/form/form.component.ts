import { AuthService } from '../../../core/services/Auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  constructor(private authService: AuthService, private router: Router) {}

  showLogin: boolean = true;
  loader: boolean = false;
  loginData = {
    email: '',
    password: '',
  };

  registerData = {
    username: '',
    password: '',
    email: '',
  };

  toggleForm(isLogin: boolean) {
    this.showLogin = isLogin;
  }

  login() {
    const { email, password } = this.loginData;
    this.loader = true;
    this.authService.login(email, password).subscribe(
      (response) => {
        console.log('Usuario logueado:', response);
        this.loader = false;
        this.router.navigate(['/app/']);
      },
      (error) => {
        console.error('Error al registrar usuario:', error);
        this.loader = false;
        alert("error al logearse")
      }
    );
  }

  registerUser() {
    const { username, email, password } = this.registerData;
    this.loader = true;
    this.authService.register(email, password, username).subscribe(
      (response) => {
        console.log('Usuario registrado:', response);
        this.loader = false;
        alert("usuario registrado correctamente, puede logearse")
        window.location.reload()
      },
      (error) => {
        console.error('Error al registrar usuario:', error);
        this.loader = false;
        alert("error en registrarse")
      }
    );
  }
}
