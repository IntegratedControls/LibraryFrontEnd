
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
  
  authenticated=false;
  firstTimeInfo = false;
  types=['Charity', 'Volunteer'];
  
  getUser(){
    this.authenticated = this.auth.isAuthenticated();
    let uid = this.auth.getTokenPayload().sub;
    this.httpClient.fetch(process.env.BackendUrl + '/user/' + uid)
    .then(response => response.json())
    .then(data => {
      this.user = data;
      this.firstTimeInfo = this.configured();
      if (this.user.userType === 'Charity'){
        this.user.userType = 1;
        this.router.navigate('charity');
      } else if (this.user.userType === 'Volunteer'){
        this.user.userType = 2;
        this.router.navigate('volunteer');
      }
    });
  }
  
  updateUser(){
    let uid = this.auth.getTokenPayload().sub;
    let tempUserType = this.user.userType;
    this.user.userType = this.types[this.user.userType - 1];
    this.httpClient.fetch(process.env.BackendUrl + '/user/' + uid, {
      method: 'put',
      body: json(this.user)
    })
    .then(response=>response.json())
    .then(data=> {
      this.user.userType = tempUserType;
      this.getUser();
    });
  }
  
  configured(){
    let returnVal = false;
    if (!('userType' in this.user)){
      returnVal = true;
      return returnVal;
    }
    return returnVal;
  }
  
  activate() {
    this.getUser();
  }
}
