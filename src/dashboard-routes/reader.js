
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
    
    if (process.env.AuthIsON !== 'false'){
      this.uid = this.auth.getTokenPayload().sub;
    }
    
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
    //TODO get the user elsewhere
    if (process.env.AuthIsON !== 'false'){
      const res1 = await this.httpClient.fetch('/user/' + this.uid);
      this.user =  await res1.json();
    }
  }
  
  checkOutBook(book){
    this.book = book;
    //TODO fetch this.book by book ID from the database, and if this.book
    //still has either a '' or a bull for .checkoutOutBy then assign it to
    //this.uid and this.user.name, else just run activate to refresh the book
    //table so that this.user can see that someone else has checked out the book
    this.book.checkedOutBy = this.uid;
    this.book.checkedOutByName = this.user.name;
    this.httpClient.fetch('/book/update/' + this.book._id, {
      method: 'put',
      body: json(this.book)
    })
    .then(response=>response.json())
    .then(data=> {
      //fetch a new list of all books
      this.activate();
    });
  }
  
  checkInBook(book){
    this.book = book;
    this.book.checkedOutBy = '';
    this.book.checkedOutByName = '';
    this.httpClient.fetch('/book/update/' + this.book._id, {
      method: 'put',
      body: json(this.book)
    })
    .then(response=>response.json())
    .then(data=> {
      //fetch a fresh new list of all books
      this.activate();
    });
  }
}
