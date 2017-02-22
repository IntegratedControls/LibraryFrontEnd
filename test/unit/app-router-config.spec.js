// import {inject} from 'aurelia-framework';
import {AppRouterConfig} from '../../src/app.router.config';
import {AuthorizeStep} from 'aurelia-auth';
import {Router} from 'aurelia-router';
//
// import {Router} from 'aurelia-router';
// import AppRouterConfig from "../../src/app.router.config";
// @inject(Router, AppRouterConfig)
//import {router} from '../../src/app.router.config';
class RouterStub {
  configure(handler) {
    handler(this);
  }

  map(routes) {
    this.routes = routes;
  }

  addPipelineStep(param1, param2) {
    //do nothing
  }
}

describe('the app.router.config module', () => {
  var sut;
  var mockedRouter;

  beforeEach(() => {
    mockedRouter = new RouterStub();
    sut = new AppRouterConfig(mockedRouter);
    //sut.router = Router;
    //sut.appRouterConfig = AppRouterConfig;
    //console.log(sut);
    sut.configure();
  });

  it('contains a router property', () => {
    expect(sut.router).toBeDefined();
  });

  it('configures the router title', () => {
    expect(sut.router.title).toEqual('CST Library');
  });

  it('should have an Home route', () => {
    expect(sut.router.routes).toContain({ route: ['', 'home'], name: 'home',  moduleId: './home', nav: true, title: 'Home', settings: 'fa fa-home' });
  });

  it('should have a Book Shelf route', () => {
    expect(sut.router.routes).toContain({ route: 'bookshelf', name: 'bookshelf', moduleId: './bookshelf', nav: true, title: 'Book Shelf', settings: 'fa fa-book'});
  });

  it('should have a Create Books route', () => {
    expect(sut.router.routes).toContain({ route: 'createbooks', name: 'createbooks', moduleId: './createBooks', nav: false, title: 'Create Books', settings: 'fa fa-plus'});
  });

  it('should have a login route', () => {
    expect(sut.router.routes).toContain({ route: 'login', name: 'login', moduleId: './login', nav: false, title: 'Login', settings: 'fa fa-sign-in'});
  });

  it('should have a dashboard route', () => {
    expect(sut.router.routes).toContain({ route: 'dashboard', name: 'dashboard-router', moduleId: './dashboard-router', nav: false, title: 'Dashboard', auth: true, settings: 'fa fa-tachometer' });
  });

  it('should have a news route', () => {
    expect(sut.router.routes).toContain({ route: 'news', name: 'news', moduleId: './news', nav: true, title: 'Release Notes', settings: 'fa fa-file-text-o' });
  });
});
