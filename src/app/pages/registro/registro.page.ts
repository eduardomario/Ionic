import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { AgeValidator } from 'src/app/validators/edad';
import { PasswordValidator } from 'src/app/validators/contraseña';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user-model';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registroForm: FormGroup;
  edad: number;
  today = new Date();
  date = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate();
  fechaHide = true;
  fechaError = '';
  codigoHide = true;
  passHideDefault = true;
  passHideLength = true;
  passHideLowerCase = true;
  passHideUpperCase = true;
  passHideNotNumber = true;
  passError = '';
  passCheckHide = true;
  passCheckError = '';
  userModel: User;
  passEncrypt: string;
  private secureKey: string;
  private secureIV: string;
  constructor(
    private fb: FormBuilder,
    public router: Router,
    private data: DataService,
    private user: UserService,
    private alertCtrl: AlertController) {
    this.userModel = new User();

    this.registroForm = this.fb.group({
      nombre: ['', Validators.compose([Validators.required])],
      apellidoP: ['', Validators.compose([Validators.required])],
      apellidoM: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      pass: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        PasswordValidator.isValid])],
      passCheck: ['', Validators.compose([
        Validators.required,
        PasswordValidator.checkConfirmPassword])],
      fecha: [this.date, Validators.compose([Validators.required])],
      codigoPostal: ['', Validators.compose([Validators.required])],
      genero: ['', Validators.compose([Validators.required])],
      telefono: [''],
      codigoAmigo: [''],
      notification: [true],
      edad: [0, Validators.compose([AgeValidator.isValid])],
      accept: [false, Validators.compose([Validators.requiredTrue])],
      warning: [false, Validators.compose([Validators.requiredTrue])],
    }
    );
  }

  ngOnInit() {
  }

  async generateSecureKeyAndIV() {
 }

  regirtro() {
    this.metodo(this.registroForm.controls.pass.value);
    this.otroMetodo();
    this.convertForm();
    this.user.createUser(this.userModel).subscribe((response) => {
      console.log(response);
      this.data.setIsLogged(true);
      this.router.navigate(['menu/tab/tab1']);
    });
  }

  regresar() {
    this.router.navigate(['']);
  }

  goToTerminos() {
    this.router.navigate(['terminos']);
  }

  goToAvisos() {
    this.router.navigate(['aviso']);
  }

  passwordCheck() {
    this.passHideDefault = true;
    this.passHideLength = true;
    this.passHideLowerCase = true;
    this.passHideUpperCase = true;
    this.passHideNotNumber = true;
    if (this.registroForm.controls.pass.hasError('required')) {
      this.passHideDefault = false;
    } else {
      if (this.registroForm.controls.pass.hasError('minlength')) {
        this.passHideLength = false;
      }
      if (this.registroForm.controls.pass.hasError('not lowercase found')) {
        this.passHideLowerCase = false;
      }
      if (this.registroForm.controls.pass.hasError('not uppercase found')) {
        this.passHideUpperCase = false;
      }
      if (this.registroForm.controls.pass.hasError('not number found')) {
        this.passHideNotNumber = false;
      }
    }
  }

  confirmPasswordCheck() {
    if (this.registroForm.controls.passCheck.hasError('required')) {
      this.passCheckHide = false;
      this.passCheckError = 'La contraseña es requerida';
    } else if (this.registroForm.controls.passCheck.hasError('password not equal')) {
      this.passCheckHide = false;
      this.passCheckError = 'La contraseña no coincide';
    } else {
      this.passCheckHide = true;
    }
  }

  otroMetodo() {
    // https://www.npmjs.com/package/crypto-js
    console.log(CryptoJS.AES.encrypt(this.registroForm.controls.pass.value, 'proyecto lealtad').toString());
    console.log(CryptoJS.MD5(this.registroForm.controls.pass.value).toString());
  }

  metodo(pass: string) {
    const passArray = new TextEncoder().encode(pass);
    window.crypto.subtle.digest(
      {
          name: 'SHA-256',
      },
      new Uint8Array(passArray) // The data you want to hash as an ArrayBuffer
  )
  .then(function(hash) {
      // returns the hash as an ArrayBuffer
      console.log(new Uint8Array(hash));
      console.log(new TextDecoder().decode(new Uint8Array(hash)));
      console.log(new TextDecoder().decode(new Uint8Array(passArray)));
  });
  }

  ageConfirm() {
    const today = new Date();
    const birthdate = new Date(this.registroForm.controls.fecha.value);
    this.edad = today.getFullYear() - birthdate.getFullYear();
    const month = today.getMonth() - birthdate.getMonth();
    if ( month < 0 || (month === 0 && today.getDate() < birthdate.getDate())) {
      this.edad--;
    }
    this.registroForm.controls.edad.setValue(this.edad);
    if (this.isFutureDate(this.registroForm.controls.fecha.value)) {
      this.fechaHide = false;
      this.fechaError = 'Esta fecha no es valida';
    } else if (this.edad < 18) {
      this.fechaHide = false;
      this.fechaError = 'Este programa es para mayores de edad';
    } else {
      this.fechaHide = true;
      this.fechaError = '';
    }
  }

  codigoAmigoConfirm() {
    // Consumir servicio para encontrar el codigo del amigo
    const encontrado = false;
    if (encontrado) {
      this.codigoHide = true;
    } else {
      this.codigoHide = false;
    }
    return encontrado;
  }

  isFutureDate(registroDate: Date) {
    const today = new Date();
    let month = '';
    let day = '';
    if ((today.getMonth() + 1) < 10) {
      month = '0';
    }
    if ((today.getDate()) < 10) {
      day = '0';
    }

    const date = parseInt(today.getFullYear() + month + (today.getMonth() + 1) + day + today.getDate(), 10);

    const idate = new Date(registroDate);
    let monthR = '';
    let dayR = '';
    if ((idate.getMonth() + 1) < 10) {
      monthR = '0';
    }
    if ((idate.getDate()) < 10) {
      dayR = '0';
    }
    const idateInt = parseInt((idate.getFullYear()) + monthR + (idate.getMonth() + 1) + dayR + idate.getDate(), 10);

    if (idateInt > date) {
      return true;
    }
    return false;
  }

  convertForm() {
    this.userModel = new User();
    this.userModel.nombre = this.registroForm.controls.nombre.value;
    this.userModel.apellidoPaterno = this.registroForm.controls.apellidoP.value;
    this.userModel.apellidoMaterno = this.registroForm.controls.apellidoM.value;
    this.userModel.correo = this.registroForm.controls.email.value;
    this.userModel.pass = this.registroForm.controls.pass.value;
    this.userModel.fecha = this.registroForm.controls.fecha.value;
    this.userModel.codigoPostal = this.registroForm.controls.codigoPostal.value;
    this.userModel.genero = this.registroForm.controls.genero.value;
    this.userModel.telefono = this.registroForm.controls.telefono.value;
    this.userModel.notificacion = this.registroForm.controls.notification.value;
  }

}
