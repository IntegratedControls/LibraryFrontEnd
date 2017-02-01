// import 'bootstrap';
// import {inject} from 'aurelia-framework';
// import {Router} from 'aurelia-router';
// import AppRouterConfig from "./app.router.config";
// import {FetchConfig} from 'aurelia-auth';
// import {AuthService} from "aurelia-auth";
// import {AuthorizeStep} from 'aurelia-router';
// @inject(Router,FetchConfig, AuthService, AppRouterConfig)
import {AuthService} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import{App} from "./app";
@inject(AuthService, App )
export class Login {
  constructor(auth, app){
		this.auth = auth;
    this.app = app;
	};
	// email='';
	// password='';
	// login(){
	//     var creds = "grant_type=password&email=" + this.email + "&password=" + this.password;
	// 	return this.auth.login(this.email, this.password)
  //       //return this.auth.login(creds)
	// 	.then(response=>{
	// 		console.log("success logged " + response);
	// 	})
	// 	.catch(err=>{
  //           err.json().then(function(e){
  //           console.log("login failure : " + e.message);
  //           });
  //
	// 	});
	// };

  authenticate(name){
    console.log(name);
    console.log(this.auth.isAuthenticated());
    //console.log(this.getTokens());
        return this.auth.authenticate(name, false, null)
        .then((response)=>{
            console.log("auth response " + response);
            console.log(response);
            this.auth.setToken(response.token);
            console.log(this.auth.getTokenPayload());
            this.app.authenticated = this.auth.isAuthenticated();

            //this.getUser();
            //this.getTokens();
        });
    }
}
