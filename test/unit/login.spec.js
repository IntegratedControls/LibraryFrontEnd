import {Login} from '../../src/login';
//import {AuthService} from 'aurelia-auth';
import {App} from '../../src/app';

class AuthStub {
  
  authenticate() {
    var response = 'user is authenticated';
    return new Promise((resolve)=>{
      resolve({json: ()=>response});
    });
  }
  setToken(token) {
    this.token = token;
  }
  logout(data) {
    //Logout
    var response = 'user logged out';
    return new Promise((resolve)=>{
      resolve({json: ()=>response});
    });
  }
  getMe() {
    var response = 'This is user data';
    return new Promise((resolve)=>{
      resolve({json: ()=>response});
    });
  }
  getTokenPayload() {
    var response = this.token;
    return new Promise((resolve)=>{
      resolve({json: ()=>response});
    });
  }
  isAuthenticated() {
    this.authenticated = true;
    return this.authenticated;
  }
}

describe('the Login module', () => {
  var sut;
  var app1;
  //var http;
  
  beforeEach(() => {
    app1 = new App(null, null, new AuthStub(), null, null);
    sut = new Login(new AuthStub(), app1);
  });
  
  it('runs the authenticate function', (done) => {
    // let itemStubs = [1];
    // //let itemFake = [2];
    // let getHttp = () => {
    //   http = new HttpStub();
    //   http.itemStub = itemStubs;
    //   return http;
    // };
    // var app = new AppStub();
    //   // console.log(getHttp);
    // sut = new Login(getHttp(), app);
    // console.log(sut.auth.isAuthenticated());
    // console.log(sut);
    sut.authenticate('google');
    //expect is authenticated to be called
    expect(sut.app.authenticated).toBe(true);
    done();
  });
});
