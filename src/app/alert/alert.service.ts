import { Injectable } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

export interface AlertData{
  header: string,
  subHeader: string,
  message: string,
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private navCtrl:NavController,
    private alrtCtrl:AlertController) { }

  async presentAlert(data: AlertData):Promise<any> {
    const alert = await this.alrtCtrl.create({
      header: data.header,
      subHeader: data.subHeader,
      message: data.message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentNaavigateAlert(data: AlertData):Promise<any> {
    const alert = await this.alrtCtrl.create({
      header: data.header,
      subHeader: data.subHeader,
      message: data.message,
      buttons: [ {
        text: 'Go Back',
        handler: () => {
          this.navCtrl.navigateBack(['/list'])
        },
      }]
    });
    await alert.present();
  }
}
