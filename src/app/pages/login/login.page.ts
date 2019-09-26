import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from 'src/app/services/login/login.service';
import { CustomAlertService } from 'src/app/services/custom-alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  account: { username: string; password: string; rememberMe: boolean } = {
    username: '',
    password: '',
    rememberMe: false
  };

  constructor(
    public translateService: TranslateService,
    public loginService: LoginService,
    public customAlertService: CustomAlertService,
    public navController: NavController
  ) {}

  ngOnInit() {}

  doLogin() {
    this.loginService.login(this.account).then(
      () => {
        this.navController.navigateRoot('/tabs');
      },
      async err => {
        this.account.password = '';
        this.customAlertService.showToast('LOGIN_ERROR');
      }
    );
  }
}
