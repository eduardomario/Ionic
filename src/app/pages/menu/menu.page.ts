import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { AlertController } from '@ionic/angular';
import { MenuModel } from 'src/app/models/menu-model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  pages = MenuModel.pages;

  selectedPath = '';
  constructor(
    public router: Router,
    private data: DataService,
    private alertCtrl: AlertController) {
      this.router.events.subscribe((event: RouterEvent) => {
        if (event && event.url) {
          this.selectedPath = event.url;
        }
      });
    }

  ngOnInit() {
  }

  logout() {
    this.data.setIsLogged(false);
    this.router.navigate(['']);
  }


  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar Sesión',
      message: '¿Seguro desea cerrar sesión?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Cerrado de sesión cancelado');
          }
        }, {
          text: 'Si',
          handler: () => {
            console.log('Cerrando sesión...');
            this.logout();
          }
        }
      ]
    });
    await alert.present();
  }

}
