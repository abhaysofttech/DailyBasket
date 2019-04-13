import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = "";
  password: string = "";
  cpassword: string = "";
  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  async register() {
    const { username, password, cpassword } = this

    if (password !== cpassword) {
      this.showAlert("Error!","Password doesn't match");
      return console.error("Password not match")
    }
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username + '@gmail.com', password)
      console.log(res);
      this.showAlert("Success!","Welcome to Daily Basket!!!....")
    }
    catch (error) {
      console.dir(error);
      this.showAlert("Error!",error.message);
    }

  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["OK"]
    })
    await alert.present()
  }

}
