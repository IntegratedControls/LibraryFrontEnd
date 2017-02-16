
import {AuthService} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {App} from './app';
@inject(AuthService, App )
export class Login {
  constructor(auth, app){
    this.auth = auth;
    this.app = app;
  }

  authenticate(name){
    let ret = this.auth.authenticate(name, false, null);
    ret.then(data => {
      this.auth.setToken(data.token);
      this.app.authenticated = this.auth.isAuthenticated();
    }, undefined);
    return ret;
  }
}
