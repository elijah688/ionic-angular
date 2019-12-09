import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

interface errorType{
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
    { type: 'required', message: 'Username is required.' },
    { type: 'minlength', message: 'Username must be at least 6 characters long.' },
    { type: 'email', message: 'Please enter a valid email address.' }
  ]
  private authForm = this.fb.group({
    email: ['',[Validators.required,Validators.minLength(6), Validators.email]],
    pass: ['', [Validators.required]],
  });

  constructor(private alertController:AlertController, private fb:FormBuilder) { }

  ngOnInit() {
  }



  myLog(){
    console.log(this.authForm.controls['email'].errors)
    console.log(this.authForm.controls['email'].hasError('required'))

  }

  signUpUser():void{
    if(this.authForm.valid){
      console.log('FORM IS VALID')
      this.presentAlert();
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

}
