
import {inject} from 'aurelia-framework';
import {App} from '../app';
import {AuthService} from 'aurelia-auth';
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(AuthService, HttpClient, App)
export class ReaderDashboard {
  constructor(auth, httpClient, app){
    this.app = app;
    this.auth = auth;
    this.httpClient = httpClient;
    this.book = {
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
      'comments': ''
    };
  }

  authenticated = false;

  async activate(){
    await fetch;

    this.httpClient.configure(config => {
      config
      .useStandardConfiguration()
      .withBaseUrl(process.env.BackendUrl);
    });

    const res = await this.httpClient.fetch('/book/getall');
    this.books =  await res.json();
  }

  checkOutBook(book){
    this.authenticated = this.auth.isAuthenticated();
    let uid = this.auth.getTokenPayload().sub;
    this.book = book;
    this.book.checkedOutBy = uid;
    console.log(this.book);
    this.httpClient.fetch(process.env.BackendUrl + '/book/update/' + this.book._id, {
      method: 'put',
      body: json(this.book)
    })
    .then(response=>response.json())
    .then(data=> {
      console.log(data);
    });
  }
}
