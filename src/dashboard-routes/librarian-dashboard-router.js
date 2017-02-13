export class LibrarianRouter {
  heading = 'Librarian Router';

  configureRouter(config, router) {
    config.map([
      { route: '', name: 'librarian-dashboard', moduleId: './librarian-dashboard', nav: false, title: 'Librarian Dashboard', auth: true}
      //{ route: "create",         name: 'create',        moduleId: './bookstore-routes/createBooks',        nav: false, title: 'Create', auth:true},
      //{ route: "show",         name: 'show',        moduleId: './bookstore-routes/show',        nav: false, title: 'Show', auth:true}
    ]);

    this.router = router;
  }
}
