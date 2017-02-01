export class DashboardRouter {
  heading = 'Dashboard Router';

  configureRouter(config, router) {
    config.map([
      { route: "",         name: 'dashboard',        moduleId: './dashboard-routes/dashboard',        nav: false, title: 'Dashboard', auth:true},
      { route: "volunteer",         name: 'volunteer',        moduleId: './dashboard-routes/volunteer-dashboard',        nav: false, title: 'Volunteer', auth:true},
      { route: "charity",         name: 'charity',        moduleId: './dashboard-routes/charity-dashboard',        nav: false, title: 'Charity', auth:true},
      { route: "store",         name: 'store',        moduleId: './dashboard-routes/store-manager-dashboard-router',        nav: false, title: 'Store', auth:true},
      { route: "info", name: 'info',       moduleId: './dashboard-routes/info',       nav: true, title: 'Information', auth:true }
    ]);

    this.router = router;
  }
}
