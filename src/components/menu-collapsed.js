import {Router} from 'aurelia-router';
import {inject, bindable} from 'aurelia-framework';

@inject(Router)
export class MenuCollapsed {

  constructor(Router) {
    this.router = Router;
  }
}
