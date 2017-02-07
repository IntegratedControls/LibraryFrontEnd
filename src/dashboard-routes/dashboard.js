//import 'bootstrap';
import {inject} from 'aurelia-framework';
import {App} from '../app';
import {Router} from 'aurelia-router';
//import DashboardRouterConfig from "./dashboard-router";
//import {FetchConfig} from 'aurelia-auth';
import {AuthService} from "aurelia-auth";
import {HttpClient, json} from 'aurelia-fetch-client';
//import {AuthorizeStep} from 'aurelia-router';
//@inject(Router,FetchConfig, AuthService, AppRouterConfig)
@inject(AuthService, HttpClient, App, Router)
export class Dashboard {
  constructor(auth, httpClient, app, router){
    this.app = app;
    this.auth = auth;
    this.httpClient = httpClient;
    this.router = router;

  }
  //
  authenticated=false;
  //user={};
  first_time_info = false;
  types=["Charity", "Volunteer", "Library"];
  // types=[];
  // types["Charity"]="Charity";
  // types["Volunteer"]="Volunteer";
  getUser(){
    //{
    //   console.log('dashboard.getUser()');
    //   console.log(this.app.user);
    //
    //   if(this.app.user !== undefined ){
    //     console.log('User already exists!');
    //     console.log(this.app.user);
    //     return;
    //   }
    // console.log(this.auth);
    // return this.auth.getMe().then((response)=>{console.log("get me:" + response);return response;});
    this.authenticated = this.auth.isAuthenticated();
    var uid = this.auth.getTokenPayload().sub;
    //this.httpClient.fetch(process.env.BackendUrl+'/user/'+uid)
    this.httpClient.fetch(process.env.BackendUrl + '/user/' + uid)
    .then(response => response.json())
    .then(data => {
      console.log('dashboard.getUser()');
      console.log(this);
      this.user = data;
      console.log("foo"+this.user);
      this.first_time_info = this.configured();
      if(this.user.userType == "Charity"){
        this.user.userType = 1;
        this.router.navigate("charity");
      }else if(this.user.userType == "Volunteer"){
        this.user.userType = 2;
        this.router.navigate("volunteer");
      }else if(this.user.userType == "Store Manager"){
        this.user.userType =3;
        this.router.navigate("library");
      }
      console.log("Dashboard user data");
      console.log(this.user);
      console.log("First time info:");
      console.log(this.first_time_info);

    });
  }

  updateUser(){
    var uid = this.auth.getTokenPayload().sub;
    console.log(this.user);
    var tempUserType = this.user.userType;
    console.log(tempUserType);
    this.user.userType=this.types[this.user.userType-1];
    console.log(this.user.userType);
    this.httpClient.fetch(process.env.BackendUrl + "/user/"+uid, {
      method:"put",
      body:json(this.user)
    })
    .then(response=>response.json())
    .then(data=>{
      console.log("Updated data");
      console.log(data);
      this.user.userType=tempUserType;
    });
  }

  configured(){
    var return_val = false;
    if(!("userType" in this.user)){
      console.log("Not valid configured user");
    }else{
      console.log("Valid configured user");
      return_val = true;
    }
    return return_val;
  }


  activate(){

    this.getUser();
    //this.first_time_info = this.configured();
  }
  //function getName

  //function updateUser
}
