import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CustomAlertService {

  constructor(public toastCtrl: ToastController, private translate: TranslateService) {}

  async showToast(text: string) {
    let toast;
    this.translate.get(text).subscribe(async (value) => {
      if (value) {
        toast = await this.toastCtrl.create({message: value, duration: 2000, position: 'bottom', cssClass: 'custom-toast'});
      } else {
        toast = await this.toastCtrl.create({message: text, duration: 2000, position: 'bottom', cssClass: 'custom-toast'});
      }
      toast.present();
    });
  }
}