import {Login} from '../../src/login';
class HttpStub {
  fetch(url) {
    var response = this.itemStub;
    this.url = url;
    return new Promise((resolve) => {
      resolve({ json: () => response });
    });
  }
  authenticate(param1, param2, param3) {
    var response = this.itemStub;
    this.user = this.itemStub;
    return new Promise((resolve) => {
      resolve({ json: () => response });
    });
  }
  setToken(token) {
    this.user = token;
  }
  isAuthenticated() {
    return 'Yes';
  }
  configure(func) {
  }
}

class AppStub {
  constructor() {
    const authenticated = false;
  }
}

describe('the Login module', () => {
  var sut;
  var http;

  beforeEach(() => {
    sut = new Login();
  });

  // it('tests authenticate', (done) => {
  //   let itemStubs = [1];
  //   //let itemFake = [2];
  //   let getHttp = () => {
  //     http = new HttpStub();
  //     http.itemStub = itemStubs;
  //     return http;
  //   };
  //   var app = new AppStub();
  //     // console.log(getHttp);
  //   sut = new Login(getHttp(), app);
  //     // console.log(sut.auth.isAuthenticated());
  //     // console.log(sut);
  //   sut.authenticate('google');
  //   //expect is authenticated to be called
  //   expect(sut.app.authenticated).toBe(true);
  //   done();
  // });
});
