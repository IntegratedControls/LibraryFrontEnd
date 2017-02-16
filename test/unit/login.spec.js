import {Login} from '../../src/login';

class AuthStub {
  authenticated = false;
  authenticate(name, f = false, o = null) {
    return Promise.resolve({
      name: name,
      token: 'heyvgyuv38t327rvuiqt78b934ujwehgyq89ery8t'
    });
  }
  setToken(token) {
    this.token = token;
    this.authenticated = true;
  }
  isAuthenticated() {
    return this.authenticated;
  }
}

class AppStub {
  authenticated = false;
}

describe('the Login module', () => {
  var sut;
  var app1;
  var auth;

  beforeEach(() => {
    app1 = new AppStub();
    auth = new AuthStub();
    sut = new Login(auth, app1);
  });

  it('should expect authentication to function as rewritten.', done => {
    sut.authenticate('google').then((data) => {
      console.log(data); // disable this if you want to.
      done();
    }, null);
  });

  it('runs the authenticate function', (done) => {
    sut.authenticate('google');
    //expect isAuthenticated to be called after the sut.authenticate is done calling to register change in authentication.
    setTimeout(function() {
      expect(sut.app.authenticated).toBe(true);
      done();
    }, 5);
  });
});
