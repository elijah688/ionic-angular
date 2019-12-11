import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { User } from './user.model';

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


  private signInStatus:boolean=false;
   
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

  constructor(private authService:AuthenticationService, private router: Router, private toastController:ToastController, private alertController:AlertController, private fb:FormBuilder) { }

  ngOnInit() {
   
  }


  authenticate():void{
    if(this.authForm.valid){
      const email:string = this.authForm.controls['email'].value;
      const password:string = this.authForm.controls['pass'].value;

      const user:User = {email:email, password:password, returnSecureToken:true}

      if(this.signInStatus===true){
        this.authService.signIn(user);
      }
      else{
        this.authService.signUp(user);
      }
      this.authForm.reset();
    }
    else{
      this.handleValidation();
    }
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
