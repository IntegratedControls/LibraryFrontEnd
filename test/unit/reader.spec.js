import {ReaderDashboard} from '../../src/dashboard-routes/reader';
import {App} from '../../src/app';
import {AuthService} from 'aurelia-auth';
import {HttpClient} from 'aurelia-fetch-client';
import './setup';
const Counter = require('assertions-counter');

class AuthStub {
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

class HttpStub {
  fetch(fn) {
    var response = this.itemStub;
    this.__fetchCallback = fn;
    return new Promise((resolve) => {
      resolve({ json: () => response });
    });
  }
  configure(fn) {
    this.__configureCallback = fn;
    return this.__configureReturns;
  }
}

class AuthServiceMock {
  // basic auth functions.
  authenticated = false;

  isAuthenticated() {
    return this.authenticated;
  }
  authenticate() {
    this.authenticated = true;
    return Promise.resolve('user is authenticated');
  }
  setToken(token) {
    this.token = token;
    this.authenticate();
  }
  getTokenPayload() {
    return {sub: this.token};
  }
}

class HttpMock {
  // this one catches the ajax and then resolves a custom json data.
  // real api calls will have more methods.
  constructor(data) {
    this.book = data || {title: '', author: '', checkedOutBy: '', checkedOutByName: ''};
  }
  status = 500;
  headers = {accept: 'application/json', method: '', url: ''}
  fetch(url, obj) {
    this.headers.url = url;
    this.headers.method = obj ? obj.method : 'GET';
    if (obj && obj.method === 'put') {
      this.book = obj.body;
    }
    this.status = 200;
    return Promise.resolve({
      Headers: this.headers,
      json: () => Promise.resolve(this.book)
    });
  }
  configure(fn) {
    this.__configureCallback = fn;
    return this.__configureReturns;
  }
}

describe('the reader module', () => {
  let readerdashboard;
  let readerdashboard2;
  let http;
  beforeEach(() => {
    http = new HttpStub();
    readerdashboard = new ReaderDashboard(new AuthStub(), http, App);
    readerdashboard2 = new ReaderDashboard(new AuthServiceMock(), new HttpMock(), App);
  });

  it('should activate', () =>  {
    readerdashboard.activate();
  });

  it('tests configHttpClient', (done) => {
    //var http = new HttpStub();
    //http.itemStub = itemStubs;

    const { add: ok } = new Counter(2, done);
    readerdashboard.activate().then(() => {
      readerdashboard.httpClient.__configureCallback(new(class {
        withBaseUrl(opts) {
          expect(opts).toBe(process.env.BackendUrl);
          ok();
          return this;
        }
        useStandardConfiguration() {
          //   expect(token).toBe(app1.auth.tokenInterceptor);
          ok();
          return this;
        }
      })());
    });
  });

  it('should checkout a book', done => {
    readerdashboard2.uid = '12345';
    readerdashboard2.user.name = 'John Fitzgerald';
    let book = {
      'title': '',
      'type': 'hardback',
      'author': '',
      'numberPages': 0,
      'dateOfPub': 0,
      'url': '',
      'isbn': '',
      'siteLocation': '',
      'numberOfCopies': 1,
      'access': '',
      'comments': '',
      'checkedOutBy': '',
      'checkedOutByName': ''
    };
    readerdashboard2.activate().then(() => {
      setTimeout(function() {
        readerdashboard2.checkOutBook(book);
        expect(readerdashboard2.book.checkedOutBy).toBe('12345');
        done();
      }, 5);
    }
  );
  });

  it('should checkin a book', done => {
    readerdashboard2.uid = '';
    readerdashboard2.user.name = '';
    let book = {
      'title': '',
      'type': 'hardback',
      'author': '',
      'numberPages': 0,
      'dateOfPub': 0,
      'url': '',
      'isbn': '',
      'siteLocation': '',
      'numberOfCopies': 1,
      'access': '',
      'comments': '',
      'checkedOutBy': '',
      'checkedOutByName': ''
    };
    readerdashboard2.activate().then(() => {
      setTimeout(function() {
        readerdashboard2.checkInBook(book);
        expect(readerdashboard2.book.checkedOutBy).toBe('');
        done();
      }, 5);
    }
  );
  });

  it('should checkout another book', done => {
    readerdashboard2.uid = '67890';
    readerdashboard2.user.name = 'Joan Fitz';
    let book = {
      'title': '',
      'type': 'hardback',
      'author': '',
      'numberPages': 0,
      'dateOfPub': 0,
      'url': '',
      'isbn': '',
      'siteLocation': '',
      'numberOfCopies': 1,
      'access': '',
      'comments': '',
      'checkedOutBy': '',
      'checkedOutByName': ''
    };
    readerdashboard2.activate().then(() => {
      setTimeout(function() {
        readerdashboard2.checkOutBook(book);
        expect(readerdashboard2.book.checkedOutBy).toBe('67890');
        done();
      }, 5);
    }
  );
  });
});
