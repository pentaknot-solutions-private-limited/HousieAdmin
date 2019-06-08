import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { FormControl, Validators, NgModel, ReactiveFormsModule } from '@angular/forms';


import { LoginModel } from './Models/login.model';
import { LoginService } from './Services/login.service';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, ToastyService, ToastyConfig]
})
export class LoginComponent implements OnInit {

  LoginModel: LoginModel = new LoginModel();
  webresponse: any;
  public loading = false;
  public Isdisabled = false;
    returnUrl: any;
  // ---------------------Email validation--------------------------//

  // private emailFormControl = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]);
  /*------Email validation------

  //emailId = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {

      return this.emailFormControl.hasError('required') ? 'You must enter a value' :
          this.emailFormControl.hasError('pattern') ? ' Not a valid email' : '';

  }
  */

  /** login ctor */
  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private _router: Router, private _loginService: LoginService, private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
      // localStorage.clear();
      this.toastyConfig.theme = 'bootstrap';
      this.toastyConfig.position = 'top-center';


  }

  onLoginSubmit() {
      this.loading = true;
      this.Isdisabled = true;
      this._loginService.validateLoginUser(this.LoginModel).subscribe
          (
          data => {
              this.webresponse = data;
              // console.log(this.webresponse);
              if (this.webresponse.adminId == null) {
                  // alert("Invalid Username and Password");
                  this.toastyService.error('Invalid Username or Password');
                  this.loading = false;
                  this.Isdisabled = false;
                  this._router.navigate(['Login']);
              } else {
                  // alert("Logged in Successfully");
                  this.toastyService.success('Logged in Successfully');
                  this.loading = false;
                  this._router.navigateByUrl(this.returnUrl);
              }
          },
          err => {
              if (err) {
                  this.Isdisabled = false;
                  this.toastyService.error('An Error has occured please try again after some time !' + err);
              }
          });
      // localStorage.setItem('SIAdminKey', 'TODO:test')
      // this._router.navigateByUrl('/home');
  }

  /** Called by Angular after login component initialized */
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
}
