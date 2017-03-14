
import {inject} from 'aurelia-framework';
import {App} from '../app';
import {Router} from 'aurelia-router';
import {AuthService} from 'aurelia-auth';
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(AuthService, HttpClient, App, Router)
export class Dashboard {
  constructor(auth, httpClient, app, router){
    this.app = app;
    this.auth = auth;
    this.httpClient = httpClient;
    this.router = router;
  }

  async activate(){
    await fetch;

    this.httpClient.configure(config => {
      config
      .useStandardConfiguration()
      .withBaseUrl(process.env.BackendUrl);
    });
    this.getUser();
  }

  authenticated=false;
  types=['Librarian', 'Reader'];

  getUser(){
    this.authenticated = this.auth.isAuthenticated();
    let uid = this.auth.getTokenPayload().sub;
    this.httpClient.fetch('/user/' + uid)
    .then(response => response.json())
    .then(data => {
      this.user = data;
      if (this.user.userType === 'Librarian'){
        this.router.navigate('librarian');
      } else if (this.user.userType === 'Reader' || this.user.userType === ''){
        this.router.navigate('reader');
      } else {
        this.user.userType = '';
        this.httpClient.fetch('/user/' + uid, {
          method: 'put',
          body: json(this.user)
        })
        .then(response=>response.json())
        .then(data1=> {
        });
      }
    });
  }
}
