import {Bookshelf} from '../../src/bookshelf';

import Counter from 'assertions-counter'


class HttpStub {

  fetch(fn) {
    this.__fetchCallback = fn
    return Promise.resolve(this.__fetchResolves);
  }
}

describe('the bookshelf module', () => {
  var bookshelf1;
  //var app2;
  beforeEach(() => {
    bookshelf1 = new Bookshelf(new HttpStub());

  });


  it('gets all books', () => {
    //console.log(app1);
    bookshelf1.getBooks();
    //app1.logout();
    expect(bookshelf1.books).toBe(null);
  });


});
