export class DashboardRouter {
  heading = 'Dashboard Router';
  configureRouter(config, router) {
    config.map([
      { route: '', name: 'dashboard', moduleId: './dashboard-routes/dashboard', nav: false, title: 'Dashboard', auth: true},
      { route: 'librarian', name: 'librarian', moduleId: './dashboard-routes/librarian', nav: false, title: 'Librarian', auth: true}
      // { route: 'reader', name: 'reader', moduleId: './dashboard-routes/reader-dashboard-router', nav: false, title: 'Reader', auth: true}
    ]);
    this.router = router;
  }
}
