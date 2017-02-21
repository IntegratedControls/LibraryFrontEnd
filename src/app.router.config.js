import {AuthorizeStep} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class AppRouterConfig{

  constructor(router){
    this.router = router;
  }
  configure(config, router){
    let theAppRouterConfig = function(config){
      //console.log(config);
      config.title = 'CST Library';
      config.addPipelineStep('authorize', AuthorizeStep);//Is the actually Authorization. Prevents users from certain sites when not authorized.
      config.map([
        { route: ['', 'home'], name: 'home', moduleId: './home', nav: true, title: 'Home' },
        //{ route: 'news', name: 'news', moduleId: './news', nav: true, title: 'News' },
        { route: 'bookshelf', icon: 'fa fa-book', name: 'bookshelf', moduleId: './bookshelf', nav: true, title: 'Book Shelf'},
        { route: 'createbooks', icon: 'fa fa-plus', name: 'createbooks', moduleId: './createBooks', nav: false, title: 'Create Books'},
        { route: 'login', icon: 'fa fa-sign-in', name: 'login', moduleId: './login', nav: false, title: 'Login'},
        { route: 'dashboard', icon: 'fa fa-desktop', name: 'dashboard-router', moduleId: './dashboard-router', nav: false, title: 'Dashboard', auth: true}
//TODO syntax for working icons
      ]);
    };

    this.router.configure(theAppRouterConfig);
  }

}
