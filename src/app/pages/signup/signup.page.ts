import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/services/user/user.service';
import { CustomAlertService } from 'src/app/services/custom-alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {
  account: {
    login: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    langKey: string;
  } = {
    login: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    langKey: 'en'
  };


  constructor(
    public navController: NavController,
    public userService: UserService,
    public customAlertService: CustomAlertService,
    public translateService: TranslateService
  ) {}

  ngOnInit() {}

  doSignup() {
    // set login to same as email
    this.account.login = this.account.email;
    // Attempt to login in through our User service
    this.userService.signup(this.account).subscribe(
      async () => {
        this.customAlertService.showToast('SIGNUP_SUCCESS');
      },
      async response => {
        // Unable to sign up
        const error = JSON.parse(response.error);
        let displayError = 'SIGNUP_ERROR';
        if (response.status === 400 && error.type.includes('already-used')) {
          displayError = 'EXISTING_USER_ERROR';
        } else if (
          response.status === 400 &&
          error.message === 'error.validation' &&
          error.fieldErrors[0].field === 'password' &&
          error.fieldErrors[0].message === 'Size'
        ) {
          displayError = 'INVALID_PASSWORD_ERROR';
        }
        this.customAlertService.showToast(displayError);
      }
    );
  }
}
