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
        { route: 'bookshelf', name: 'bookshelf', moduleId: './bookshelf', nav: true, title: 'Book Shelf'},
        { route: 'createbooks', name: 'createbooks', moduleId: './createBooks', nav: false, title: 'Create Books'},
        { route: 'login', name: 'login', moduleId: './login', nav: false, title: 'Login'},
        { route: 'dashboard', name: 'dashboard-router', moduleId: './dashboard-router', nav: false, title: 'Dashboard', auth: true},
        { route: 'news', name: 'news', moduleId: './news', nav: true, title: 'Release Notes' }
//TODO syntax for working icons
      ]);
    };

    this.router.configure(theAppRouterConfig);
  }

}
