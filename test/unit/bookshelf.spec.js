import {Bookshelf} from '../../src/bookshelf';
const Counter = require('assertions-counter');
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
describe('the bookshelf module', () => {
  var bookshelf1;
  beforeEach(() => {
    var itemStubs = [1];
    //var itemFake = [2];
    var http = new HttpStub();
    http.itemStub = itemStubs;
    bookshelf1 = new Bookshelf(http);
  });
  it('gets all books', () => {
    //var itemStubs = [1];
    //var itemFake = [2];
    //var http = new HttpStub();
    //http.itemStub = itemStubs;
    //let bookshelf1 = new Bookshelf(http);

    bookshelf1.activate().then(() => {
      expect(bookshelf1.books).toBe(itemStubs);
      //expect(bookshelf1.books).not.toBe(itemFake);
      done();
    });
  });

  it('tests configHttpClient', (done) => {
    //var http = new HttpStub();
    //http.itemStub = itemStubs;
    //let bookshelf1 = new Bookshelf(http);
    const { add: ok } = new Counter(2, done);
    //bookshelf1.auth.tokenInterceptor = 'tokenInterceptor';
    bookshelf1.activate().then(() => {
      bookshelf1.httpClient.__configureCallback(new(class {
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
});
