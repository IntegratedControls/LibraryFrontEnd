import {Router} from 'aurelia-router';
import {inject, bindable} from 'aurelia-framework';

@inject(Router)
export class MenuExpanded {

  constructor(Router) {
    this.router = Router;
  }
}
