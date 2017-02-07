
import {AuthService} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import{App} from "./app";
@inject(AuthService, App )
export class Login {
  constructor(auth, app){
    this.auth = auth;
    this.app = app;
  };

  authenticate(name){
    return this.auth.authenticate(name, false, null)
    .then((response)=>{
      this.auth.setToken(response.token);
      this.app.authenticated = this.auth.isAuthenticated();

    });
  }
}
