import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(HttpClient)

export class ShowBookDashboard {
  constructor(httpClient){
    this.httpClient = httpClient;
    if (process.env.NODE_ENV === 'production') {
      this.fetchURL = 'http://ourhandsandfeetbackend.herokuapp.com';
    } else {this.fetchURL = window.env.LocalBackendUrl; }
  }
  //books=[];
  books=null;
  getBooks(){
    this.httpClient.fetch(this.fetchURL + '/book/getall')
        .then(response => response.json())
        .then(data => {
          console.log("Books:");
          console.log(data);
          this.books=data;
        });

  }

  getBook(bookname){

  }

  activate(){
    this.getBooks();
  }
}
