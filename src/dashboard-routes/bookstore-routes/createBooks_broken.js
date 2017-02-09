import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router, FileReader)
export class CreateBookDashboard {
  constructor(httpClient, router, reader){
    this.httpClient = httpClient;
    this.router = router;
    this.reader = reader;
    this.newBook = {
      'title': '',
      'type': 'book',
      'author': '',
      'numberPages': 0,
      'dateOfPub': 0,
      'url': '',
      'isbn': '',
      'siteLocation': '',
      'numberOfCopies': 0,
      'comments': ''
    };
  }
  types = ['book', 'pdf', 'webpage', 'audiobook', 'gdoc'];
  newBook = null;
  CSVFilePath = {files: ['']};
  fileList = '';

  createBook(){
    if (this.newBook.type !== 0){
      this.newBook.type = this.types[this.newBook.type - 1];
    } else {
      this.newBook.type = 'book';
    }

    this.httpClient.fetch(process.env.BackendUrl + '/book/', {
      method: 'post',
      body: json(this.newBook)
    })
    //.then(response=>response.json())
    //.then(savedRecord => record = savedRecord)
    .then(data=>{
      this.router.navigate('/bookshelf');
    });
  }

  createBooksFromCSV(){
    let jsonObj;
    const httpClient = this.httpClient;
    const router = this.router;
    function loaded (evt) {
      const fileString = evt.target.result;
      const csvjson = require('csvjson');
      jsonObj = csvjson.toObject(fileString);
      makeLotaBooks(jsonObj);
    }
    function errorHandler(evt) {
      if (evt.target.error.name === 'NotReadableError') {
        alert('The file could not be read');
      }
    }
    function makeLotaBooks (jsonObject) {
      httpClient.fetch(process.env.BackendUrl + '/book/', {
        method: 'post',
        body: json(jsonObject)
      })
      .then(response=>response.json())
      .then(data=>{
        router.navigate('/bookshelf');
      });
    }
    if (this.CSVFilePath.files[0] !== ''){
      // TODO: Parse all csv files
      // TODO: add check for browser support of FileReader
      this.reader.onload = loaded;
      this.reader.onerror = errorHandler;
      this.reader.readAsText(this.CSVFilePath.files[0]);
    }
  }
}
