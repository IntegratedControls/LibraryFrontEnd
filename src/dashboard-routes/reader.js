
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
      'comments': '',
      'checkedOutBy': '',
      'checkedOutByName': ''
    };
    this.uid = this.auth.getTokenPayload().sub;
    this.user = {
    };
  }

  async activate(){
    await fetch;

    this.httpClient.configure(config => {
      config
      .useStandardConfiguration()
      .withBaseUrl(process.env.BackendUrl);
    });

    const res = await this.httpClient.fetch('/book/getall');
    this.books =  await res.json();

    const res1 = await this.httpClient.fetch('/user/' + this.uid);
    this.user =  await res1.json();
  }

  checkOutBook(book){
    this.book = book;
    this.book.checkedOutBy = this.uid;
    this.book.checkedOutByName = this.user.name;
    this.httpClient.fetch(process.env.BackendUrl + '/book/update/' + this.book._id, {
      method: 'put',
      body: json(this.book)
    })
    .then(response=>response.json())
    .then(data=> {
    });
  }

  checkInBook(book){
    this.book = book;
    this.book.checkedOutBy = '';
    this.book.checkedOutByName = '';
    this.httpClient.fetch(process.env.BackendUrl + '/book/update/' + this.book._id, {
      method: 'put',
      body: json(this.book)
    })
    .then(response=>response.json())
    .then(data=> {
    });
  }
}
