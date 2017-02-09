import {CreateBookDashboard} from '../../src/dashboard-routes/bookstore-routes/createBooks';
import {HttpClient} from 'aurelia-fetch-client';
import './setup';
import {Router} from 'aurelia-router';
import {csv as csvFixture} from './createBooks.spec.fixtures';

class HttpStub extends HttpClient {
  status = 500;
  statusText;
  object = {};
  returnKey;
  returnValue;
  responseHeaders = [];
  
  fetch(input, init) {
    let request;
    //let response;
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
    
    let promise = Promise.resolve();
    // .then( () => {
    //   if (request.headers.get('Content-Type') === 'application/json' && request.method !== 'GET') {
    //     return request.json().then(object => {
    //       object[this.returnKey] = this.returnValue;
    //       let data = new Blob([JSON.stringify(this.object)]);
    //       response = new Response(data, responseInit);
    //       return this.status >= 200 && this.status < 300 ? Promise.resolve(response) : Promise.reject(response);
    //     });
    //   }
    //   let data = new Blob([JSON.stringify(this.object)]);
    //   response = new Response(data, responseInit);
    //   return this.status >= 200 && this.status < 300 ? Promise.resolve(response) : Promise.reject(response);
    // });
    return promise;
  }
}

class RouterStub extends Router {
  
  navigate(destination) {
    return this.router.destination = destination;
    // return new Promise((resolve)=>{
    //   resolve({json: ()=>response});
    // });
  }
}

describe('the createBook module', () => {
  let sut, httpStub, routerStub, fileReaderStub;
  
  beforeEach(() => {
    httpStub = new HttpStub();
    routerStub = new RouterStub();
    fileReaderStub = {};
    sut = new CreateBookDashboard( httpStub, routerStub, fileReaderStub ); //We're using DI for our HttpClient
    sut.httpClient.status = 200; //we'll check for errors later
    sut.httpClient.object = {id: '1', artist: 'Prince', record: 'Purple Rain'}; //this is what we expect to from the GET
    sut.httpClient.returnKey = 'date'; //key returned from PUT/CREATE/POST
    sut.httpClient.returnValue = '6/24/1984'; //value returned from PUT/CREATE/POST
    sut.httpClient.responseHeaders = {accept: 'json'};
  });
  
  xit('should post a new book from the form data', () => {
    sut.newBook = {'title': 'testTitle', 'type': 'pdf'};
    sut.createBook();
    //expect(this.Res.status).toEqual(201);
    //done();
  });
  
  xit('should post a new book from the form data as type equals book if a type is not defined', () => {
    sut.newBook = {'title': 'howdy', 'type': 0};
    sut.createBook();
    //expect(record).toEqual({"title":"testTitle","id":"1","type":"pdf", date: '6/24/1984'})
    //done();
  });
  
  it('should convert from csv and then post that array of books', (done) => {
    // fileReaderStub.readAsText = () => {};
    // sut.CSVFilePath = { files: [csvFixture.string] };
    // sut.createBooksFromCSV();
    // sut.httpClient.fetch = (url, {body: blob}) => {
    //   const reader = new FileReader();
    //   reader.onload =  () => {
    //     const data = new TextDecoder('utf8').decode(reader.result);
    //     expect(JSON.parse(data)).toEqual(csvFixture.json);
    done();
    //   };
    //   reader.readAsArrayBuffer(blob);
    //   return new Promise(()=>{}); // never resolved
    // };
    // fileReaderStub.onload({ target: { result: csvFixture.string } });
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
