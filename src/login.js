
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
    //TODO listen for google to repsond if not already logged in
    //https://developers.google.com/identity/sign-in/web/listeners
    //http://stackoverflow.com/questions/38876670/aurelia-click-attribute-that-requires-event-target-to-be-same-as-element
    //http://stackoverflow.com/questions/37171766/aurelia-binding-back-to-view-model-on-button-click
    ret.then(data => {
      this.auth.setToken(data.token);
      this.app.authenticated = this.auth.isAuthenticated();
    }, undefined);
    return ret;
  }
}
