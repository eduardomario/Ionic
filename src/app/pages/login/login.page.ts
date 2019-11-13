import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  userHide = true;
  userError = '';
  passHide = true;
  passError = '';
  constructor(
    private fb: FormBuilder,
    public router: Router,
    private data: DataService,
    private user: UserService) {
    this.loginForm = this.fb.group({
      user: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    });
  }

  ngOnInit() {
  }

  login() {
    this.user.getUser(this.loginForm.controls.user.value, this.loginForm.controls.password.value).subscribe((response) => {
      if (response.success === '200') {
        console.log('Success');
        this.data.setIsLogged(true);
        this.router.navigate(['menu/tab/tab1']);
      } else {
        console.log('Error');
      }
    }, (err) => {
      console.log('Error');
      console.error(err);
    });
  }

  regirtro() {
    this.router.navigate(['registro']);
  }

  checkUser() {
    if (!(this.loginForm.controls.user.valid)) {
      this.userHide = false;
      if (this.loginForm.controls.user.hasError('required')) {
        this.userError = 'El usuario es Requerido';
      } else if (this.loginForm.controls.user.hasError('email')) {
        this.userError = 'El usuario es Incorrecto';
      }
    } else {
      this.userHide = true;
    }
  }

  checkPassword() {
    if (!(this.loginForm.controls.password.valid)) {
      this.passHide = false;
      if (this.loginForm.controls.password.hasError('required')) {
        this.passError = 'La contraseña es Requerida';
      } else if (this.loginForm.controls.password.hasError('minlength')) {
        this.passError = 'La contraseña debe tener minimo 8 caracteres';
      }
    } else {
      this.passHide = true;
    }
  }

}
