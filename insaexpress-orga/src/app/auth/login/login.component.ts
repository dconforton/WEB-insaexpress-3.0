/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {NB_AUTH_OPTIONS_TOKEN} from '@nebular/auth/auth.options';
import {getDeepFromObject} from '@nebular/auth/helpers';

import {NbAuthResult, NbAuthService} from '@nebular/auth/services/auth.service';

@Component({
  selector: 'app-nb-login',
  template: `
    <nb-auth-block>
      <h2 class="title"><img src="/assets/logo.png" alt="INSA Express" width="300"/></h2>
      <small class="form-text sub-title">L'accès est limité aux organisateurs de la course</small>

      <form (ngSubmit)="login()" #form="ngForm" autocomplete="nope">

        <div *ngIf="showMessages.error && errors && errors.length > 0 && !submitted"
             class="alert alert-danger" role="alert">
          <div><strong>Oh snap!</strong></div>
          <div *ngFor="let error of errors">{{ error }}</div>
        </div>

        <div *ngIf="showMessages.success && messages && messages.length > 0 && !submitted"
             class="alert alert-success" role="alert">
          <div><strong>Hooray!</strong></div>
          <div *ngFor="let message of messages">{{ message }}</div>
        </div>

        <div class="form-group">
          <label for="input-email" class="sr-only">Identifiant</label>
          <input name="text" [(ngModel)]="user.username" id="input-username"
                 class="form-control" placeholder="Identifiant" #username="ngModel"
                 [class.form-control-danger]="username.invalid && username.touched" autofocus
                 [required]="getConfigValue('forms.validation.email.required')">
          <small class="form-text error" *ngIf="username.invalid && username.touched">
            Veuillez entrez un identifiant
          </small>
        </div>

        <div class="form-group">
          <label for="input-password" class="sr-only">Password</label>
          <input name="password" [(ngModel)]="user.password" type="password" id="input-password"
                 class="form-control" placeholder="Mot de passe" #password="ngModel"
                 [class.form-control-danger]="password.invalid && password.touched"
                 [required]="getConfigValue('forms.validation.password.required')"
                 [minlength]="getConfigValue('forms.validation.password.minLength')"
                 [maxlength]="getConfigValue('forms.validation.password.maxLength')">
          <small class="form-text error" *ngIf="password.invalid && password.touched">
            Le mot de passe est requis
          </small>
        </div>

        <!--<div class="form-group accept-group col-sm-12">
          <label class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input"
                   [(ngModel)]="user.rememberMe">
            <span class="custom-control-indicator"></span>
            <span class="custom-control-description">
        Se souvenir de moi
      </span>
          </label>
        </div>-->

        <button [disabled]="submitted || !form.valid" class="btn btn-block btn-hero-success"
                [class.btn-pulse]="submitted">
          Se connecter
        </button>
      </form>
    <!--
      <div class="links">
        <small class="form-text">Or connect with:</small>

        <div class="socials">
          <a href="https://github.com/akveo" target="_blank" class="socicon-github"></a>
          <a href="https://www.facebook.com/akveo/" target="_blank" class="socicon-facebook"></a>
          <a href="https://twitter.com/akveo_inc" target="_blank" class="socicon-twitter"></a>
        </div>

        <small class="form-text">
          Don't have an account? <a routerLink="../register"><strong>Sign Up</strong></a>
        </small>
      </div>
      -->
    </nb-auth-block>
  `,
})
export class NbLoginComponent {

  redirectDelay = 0;
  showMessages: any = {};
  provider = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted = false;

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS_TOKEN) protected config = {},
              protected router: Router) {

    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.provider = this.getConfigValue('forms.login.provider');
  }

  login(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.authenticate(this.provider, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;

      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }
}
