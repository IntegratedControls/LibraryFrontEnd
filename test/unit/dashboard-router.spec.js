import {DashboardRouter} from '../../src/dashboard-router';
import {Router} from 'aurelia-router';

class DashboardRouterStub extends DashboardRouter{
  config={};
}

class ConfigStub {
  map(array1) {
    return array1;
  }
}

class RouterStub {
  configure(handler) {
    handler(this);
  }

  map(routes) {
    this.routes = routes;
  }

  addPipelineStep(param1, param2){
    //do nothing
  }
}

describe('the dashboard-router module', () => {
  var sut;
  var mockedRouter;


  mockedRouter = new RouterStub();
  const config1 = new ConfigStub;
  config1.map([
    { route: "", name: 'dashboard', moduleId: './dashboard-routes/dashboard', nav: false, title: 'Dashboard', auth:true},
    { route: "volunteer", name: 'volunteer', moduleId: './dashboard-routes/volunteer-dashboard', nav: false, title: 'Volunteer', auth:true},
    { route: "charity", name: 'charity', moduleId: './dashboard-routes/charity-dashboard', nav: false, title: 'Charity', auth:true},
    { route: "library", name: 'library', moduleId: './dashboard-routes/store-manager-dashboard-router', nav: false, title: 'Store', auth:true}
    //{ route: "info", name: 'info',       moduleId: './dashboard-routes/info',       nav: true, title: 'Information', auth:true }
  ]);
  sut = new DashboardRouter(mockedRouter);
  //sut.router = Router;
  //sut.appRouterConfig = AppRouterConfig;
  //console.log(sut);
  //sut.configure();


  // it('contains a router property', () => {
  //   expect(sut.router).toBeDefined();
  // });

  it('configures the dashboard child routes', (done) => {
    sut.configureRouter(config1, mockedRouter);
    expect(sut.router).toBeDefined;
    done();
  });

  // it('should have an volunteer route', () => {
  //   expect(sut.router.routes).toContain({ route: "volunteer", name: 'volunteer', moduleId: './dashboard-routes/volunteer-dashboard', nav: false, title: 'Volunteer', auth:true });
  // });
  //
  // it('should have a charity route', () => {
  //   expect(sut.router.routes).toContain({ route: "charity", name: 'charity', moduleId: './dashboard-routes/charity-dashboard', nav: false, title: 'Charity', auth:true });
  // });
  //
  // it('should have a library route', () => {
  //   expect(sut.router.routes).toContain({ route: "library", name: 'library', moduleId: './dashboard-routes/store-manager-dashboard-router', nav: false, title: 'Store', auth:true });
  // });

  // it('should have a login route', () => {
  //   expect(sut.router.routes).toContain({ route: 'dashboard', name: 'dashboard', moduleId: './dashboard', nav: false, title: 'Dashboard', auth:true });
  // });
});
