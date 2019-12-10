import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';

interface errorType{
    input:string,
    type:string,
    message:string
}
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.sass'],
})


export class AuthenticationPage implements OnInit {


 
  private validations:errorType[] = [ 
    { input: 'email', type: 'required', message: 'Email is required.' },
    { input: 'email', type: 'email', message: 'Please enter a valid email address.' },
    { input: 'email', type: 'minlength', message: 'Email must be at least 6 characters long.' },
    { input: 'pass', type: 'required', message: 'Password is required.' },
    { input: 'pass', type: 'minlength', message: 'Password must be at least 6 characters long.' },

  ]
  private authForm = this.fb.group({
    email: ['',[Validators.required, Validators.minLength(6), Validators.email]],
    pass: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private toastController:ToastController, private alertController:AlertController, private fb:FormBuilder) { }

  ngOnInit() {
   
  }


  signUpUser():void{
    if(this.authForm.valid){
      this.presentAlert();
    }
    else{
      this.handleValidation();
    }
  }

  async presentAlert():Promise<any> {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'You have signed up',
      message: `You can now sign in with your user name: ${this.authForm.controls['email'].value}` ,
      buttons: ['OK']
    });
    await alert.present();
  }
  
  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'dark',
      showCloseButton: true
    });
    toast.present();
  }

  handleValidation():void{
    for(const v of this.validations){
      if(this.authForm.controls['email'].hasError(v.type) && v.input==='email'){
        this.presentToast(v.message);
        break;
      }
      if(this.authForm.controls['pass'].hasError(v.type) && v.input==='pass' && this.authForm.controls['email'].valid){
        this.presentToast(v.message);
        break;
      }

    }
  }

}
