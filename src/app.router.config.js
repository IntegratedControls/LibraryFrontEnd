import {AuthorizeStep} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class AppRouterConfig{
  
  constructor(router){
    this.router = router;
  }
  
  configure(config1, router){
    let theAppRouterConfig = function(config){
      let doAuth = true;
      if (process.env.AuthIsON === 'false'){
        doAuth = false;
      }
      config.title = 'CST Library';
      //config.options.pushState = true;
      //config.options.root = '/';
      config.addPipelineStep('authorize', AuthorizeStep);//Is the actually Authorization. Prevents users from certain sites when not authorized.
      config.map([
        { route: ['', 'home'], name: 'home', moduleId: './home', nav: true, title: 'Home', settings: 'fa fa-home'},
        { route: 'bookshelf', name: 'bookshelf', moduleId: './bookshelf', nav: true, title: 'Bookshelf', settings: 'fa fa-book'},
        // { route: 'createbooks', name: 'createbooks', moduleId: './createBooks', nav: false, title: 'Create Books', settings: 'fa fa-plus'},
        { route: 'login', name: 'login', moduleId: './login', nav: false, title: 'Login', settings: 'fa fa-sign-in'},
        { route: 'dashboard', name: 'dashboard-router', moduleId: './dashboard-router', nav: false, title: 'Dashboard', auth: doAuth, settings: 'fa fa-tachometer'},
        { route: 'releasenotes', name: 'releasenotes', moduleId: './releasenotes', nav: true, title: 'Release Notes', settings: 'fa fa-file-text-o'}
      ]);
    };
    
    this.router.configure(theAppRouterConfig);
  }
  
}
