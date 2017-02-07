import {Bookshelf} from '../../src/bookshelf';

class HttpStub {
  fetch(fn) {
    var response = this.itemStub;
    this.__fetchCallback = fn
    return new Promise((resolve) => {
      resolve({ json: () => response });
    });
  }
}

describe('the bookshelf module', () => {


  it('gets all books', () => {

    var itemStubs = [1];
    var itemFake = [2];
    var http = new HttpStub();
    http.itemStub = itemStubs;

    var bookshelf1 = new Bookshelf(http);

    bookshelf1.activate().then(() => {
      expect(bookshelf1.books).toBe(itemStubs);
      expect(bookshelf1.books).not.toBe(itemFake);
      done();
    });
  });
});

