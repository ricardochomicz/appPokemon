import { Injectable } from '@angular/core';
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

    async toastMessage(message: string, duration: number = 2000, position: any = 'top') {
        const toast = await this.toastController.create({
            message: message,
            duration: duration,
            position: position
        });
        toast.present();
    }
}
