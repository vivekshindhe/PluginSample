import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Checkout } from 'capacitor-razorpay';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private alertController: AlertController) {}

  async payWithRazorpay(){
    const options = { 
      key: 'rzp_test_1DP5mmOlF5G5ag',
      amount: '100',
      description: 'Credits towards consultation', 
      image: 'https://i.imgur.com/3g7nmJC.png', 
      currency: 'INR', 
      name: 'foo', 
      prefill: { 
        email: 'void@razorpay.com', 
        contact: '9191919191', 
        name: 'Razorpay Software'
      },
      theme: {
        color: '#F37254'
      }
    }
    try {
    let data = (await Checkout.open(options));
    console.log(data.response+"HELLOOOÓ");
    
    this.presentAlert(data.response);
    } catch (error) {
      this.presentAlert(error.message); //Doesn't appear at all
    }
  }

  async presentAlert(response: string){
    // let responseObj = JSON.parse(response)
    console.log("message"+ response['razorpay_payment_id']);
    const alert = await this.alertController.create({
      message:response['razorpay_payment_id'],
      backdropDismiss: true,
    });

    await alert.present();
  }

}
