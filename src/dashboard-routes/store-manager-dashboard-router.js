export class StoreManagerRouter {
  heading = 'Store Manager Router';

  configureRouter(config, router) {
    config.map([
      { route: "",         name: 'store',        moduleId: './store-manager-dashboard',        nav: false, title: 'Dashboard', auth:true},
      { route: "create",         name: 'create',        moduleId: './bookstore-routes/createBooks',        nav: false, title: 'Create', auth:true},
      { route: "show",         name: 'show',        moduleId: './bookstore-routes/show',        nav: false, title: 'Show', auth:true}
    ]);

    this.router = router;
  }
}
