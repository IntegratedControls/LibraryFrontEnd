import {Router} from 'aurelia-router';
import {inject, bindable} from 'aurelia-framework';
import {App} from '../app';

@inject(Router, App)
export class MenuCollapsed {

  constructor(router, app) {
    this.router = router;
    this.app = app;
  }

  expand(router){
    this.app.collapsed = false;
    this.router = router;
    this.router.navigate(router.route);
  }
}
