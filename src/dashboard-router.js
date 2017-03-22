export class DashboardRouter {

  heading = 'Dashboard Router';
  //doAuth = true;
  //authIsOn = process.env.AuthIsON;
  
  configureRouter(config, router) {
    let doAuth = true;
    //console.log(process.env.AuthIsOn);
    if (process.env.AuthIsON === 'false'){
      doAuth = false;
    }
    config.map([
      { route: '', name: 'dashboard', moduleId: './dashboard-routes/dashboard', nav: false, title: 'Dashboard', auth: doAuth},
      { route: 'librarian', name: 'librarian', moduleId: './dashboard-routes/librarian', nav: false, title: 'Librarian', auth: doAuth},
      { route: 'reader', name: 'reader', moduleId: './dashboard-routes/reader', nav: false, title: 'Reader', auth: doAuth}
    ]);
    this.router = router;
  }
}
