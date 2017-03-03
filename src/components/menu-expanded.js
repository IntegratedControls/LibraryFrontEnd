import {Router} from 'aurelia-router';
import {inject, bindable} from 'aurelia-framework';
import {App} from '../app';
import {AppRouterConfig} from '../app.router.config';

@inject(Router, App, AppRouterConfig)
export class MenuExpanded {

  constructor(router, app, appRouterConfig) {
    this.router = router;
    this.app = app;
    this.appRouterConfig = appRouterConfig;
  }

  activate() {
    app.appRouterConfig.configure();
  }

  collapse(router){
    this.app.collapsed = true;
    this.router = router;
    this.router.navigate(router.route);
  }

}
