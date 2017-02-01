// import 'bootstrap';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {AppRouterConfig} from './app.router.config';
import {FetchConfig} from 'aurelia-auth';
import {AuthService} from 'aurelia-auth';
import {AuthorizeStep} from 'aurelia-router';
import {HttpClient} from 'aurelia-fetch-client';

@inject(Router, FetchConfig, AuthService, AppRouterConfig, HttpClient)
export class App {
  constructor(router, fetchConfig, auth, appRouterConfig, httpClient){
    this.router = router;
    this.appRouterConfig = appRouterConfig;
    this.fetchConfig = fetchConfig;
    this.auth = auth;
    this.httpClient = httpClient;
    this.user = this.getUser();
  }


  email='';
  password='';
  authenticated = false;
  token="";
  //user=null;
    // login(){
    //       return this.auth.login(this.email, this.password)
    //       .then(response=>{
    //           console.log("success logged " + response);
    //       })
    //       .catch(err=>{
    //           console.log("login failure");
    //       });
    //   };

    // authenticate(name){
    //   console.log(name);
    //   console.log(this.auth.isAuthenticated());
    //   //console.log(this.getTokens());
    //       return this.auth.authenticate(name, false, null)
    //       .then((response)=>{
    //           console.log("auth response " + response);
    //           console.log(response);
    //           this.auth.setToken(response);
    //           this.authenticated = this.auth.isAuthenticated();
    //
    //           //this.getUser();
    //           //this.getTokens();
    //       });
    //   }

  logout(){
    this.auth.setToken('');
    this.authenticated = false;
    this.auth.logout('#/');
  }

  getUser(){
      // console.log(this.auth);
      // return this.auth.getMe().then((response)=>{console.log("get me:" + response);return response;});
    this.authenticated = this.auth.isAuthenticated();
    if (this.authenticated) {
      const uid = this.getTokens().sub;
      //console.log("In get user - uid:"+uid);
        // this.httpClient.fetch('http://localhost:7000/user/'+uid)
        //   .then(response => response.json())
        //   .then(data => {
        //     console.log('app.getUser()');
        //       console.log(data);
        //       return data;
          //});
      } else {
          return "";
        }
    }
    // finalizeUser(){
    //   this.user
    //   .then(response => response.json())
    //     .then(data => {
    //         //console.log(data);
    //         this.user = data;
    //     })
    // }
    getTokens(){
      return this.auth.getTokenPayload();
    }
  activate(){
    console.log(this.auth.isAuthenticated());
    //this.authenticated = this.auth.isAuthenticated();
    // if(this.authenticated){
    //   this.getUser();
    //   //console.log(this.getTokens());
    // }
    //this.finalizeUser();
    this.appRouterConfig.configure();
    this.configHttpClient();
    //this.getUser();
  }

  configHttpClient(){
    this.httpClient.configure(httpConfig => {
      httpConfig
        .withDefaults({
          mode: 'cors',
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json'
          }
        })
        .withInterceptor(this.auth.tokenInterceptor);
    });
  }

  // configureRouter(config, router) {
  //   config.title = 'Our Hands and Feet';
  //   config.addPipelineStep('authorize', AuthorizeStep);
  //   config.map([
  //     { route: ['', 'home'], name: 'home',      moduleId: './home',      nav: true, title: 'About' },
  //     { route: 'services',         name: 'services',        moduleId: './services',        nav: true, title: 'News' },
  //     // { route: 'jobs',  name: 'jobs', moduleId: './jobs', nav: true, title: 'Jobs' }
  //   ]);
  //
  //   this.router = router;
  // }

}
