import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router, FileReader)
export class LibrarianDashboard {
  constructor(httpClient, router, reader){
    this.httpClient = httpClient;
    this.router = router;
    this.reader = reader;
    this.newBook = {
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
  }
  types = ['hardback', 'paperback', 'pdf', 'webpage', 'video', 'audiobook', 'gdoc'];
  accessArray = ['GE Internal', 'Public'];
  newBook = null;
  CSVFilePath = {files: ['']};
  fileList = '';

  createBook(){
    if (this.newBook.type !== 0){
      this.newBook.type = this.types[this.newBook.type - 1];
    } else {
      this.newBook.type = 'book';
    }
    if (this.newBook.access !== 0){
      this.newBook.access = this.accessArray[this.newBook.access - 1];
    } else {
      this.newBook.access = 'Public';
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
      //TODO no file attached
      //TODO wrong file type attached
      alert('The file could not be read');
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
    // if (CSVFilePath.files[0] !== null){
    // TODO: Parse all csv files
    // TODO: add check for browser support of FileReader
    //TODO: do not run file reader if no csv file in the form
    this.reader.onload = loaded;
    this.reader.onerror = errorHandler;
    this.reader.readAsText(CSVFilePath.files[0]);
  }
}
