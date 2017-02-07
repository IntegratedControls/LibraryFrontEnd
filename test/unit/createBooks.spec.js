import {CreateBookDashboard} from '../../src/dashboard-routes/bookstore-routes/createBooks';
import {HttpClient, json} from 'aurelia-fetch-client';
import './setup';


class HttpStub extends HttpClient {
  status = 500;
  statusText;
  object = {};
  returnKey;
  returnValue;
  responseHeaders = [];
  
  fetch(input, init) {
    let request;
    let response;
    let responseInit = {};
    responseInit.headers = new Headers();
    
    for (let name in this.responseHeaders || {}) {
      responseInit.headers.set(name, this.responseHeaders[name]);
    }
    
    responseInit.status = this.status || 200;
    
    if (Request.prototype.isPrototypeOf(input)) {
      request = input;
    } else {
      request = new Request(input, init || {});
    }
    if (request.body && Blob.prototype.isPrototypeOf(request.body) && request.body.type) {
      request.headers.set('Content-Type', request.body.type);
    }
    
    let promise = Promise.resolve().then( () => {
      let response;
      if (request.headers.get('Content-Type') === 'application/json' && request.method !== 'GET') {
        return request.json().then(object => {
          object[this.returnKey] = this.returnValue;
          let data = new Blob([JSON.stringify(this.object)]);
          response = new Response(data, responseInit);
          return this.status >= 200 && this.status < 300 ? Promise.resolve(response) : Promise.reject(response);
        });
      } else {
        let data = new Blob([JSON.stringify(this.object)]);
        response = new Response(data, responseInit);
        return this.status >= 200 && this.status < 300 ? Promise.resolve(response) : Promise.reject(response);
      }
    });
    return promise;
  }
}


describe('the createBook module', () => {
  let http = new HttpStub(); //we'll get to this later
  let sut;
  sut = new CreateBookDashboard(http); //We're using DI for our HttpClient
  
  beforeEach(() => {
    sut.httpClient.status = 200; //we'll check for errors later
    sut.httpClient.object = {id: '1', artist: 'Prince', record: 'Purple Rain'}; //this is what we expect to from the GET
    sut.httpClient.returnKey = 'date'; //key returned from PUT/CREATE/POST
    sut.httpClient.returnValue = '6/24/1984'; //value returned from PUT/CREATE/POST
    sut.httpClient.responseHeaders = {accept: 'json'};
  });
  
  it('should save save a new book from the form data', () => {
    sut.newBook = {'title': 'testTitle', 'type': 'pdf'};
    sut.createBook().then( (record) => {
      //expect(record).toEqual({"title":"testTitle","id":"1","type":"pdf", date: '6/24/1984'})
      //done();
    });
  });
  
  it('should convert from csv and save that array of books', () => {
  });
  // it('displays an modal to the user when a record cannot be saved', (done) => {
  //   sut.http.status = 400
  //   sut.http.statusText = "Record Not Found"
  //
  //   spyOn(sut, "popModel")
  //
  //   sut.save(sut.http.object).catch( (error) => { //notice we use a catch here.
  //     expect(error.status).toEqual(400)
  //     expect(sut.popModel).toHaveBeenCalledWith("Unable to Save Record", error.statusText)
  //     done()
  //   })
  // })
});
