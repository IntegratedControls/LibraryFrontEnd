import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(HttpClient)
export class CreateBookDashboard {
  constructor(httpClient){
    this.httpClient = httpClient;
    if (process.env.NODE_ENV === 'production') {
      this.fetchURL = 'http://ourhandsandfeetbackend.herokuapp.com';
    } else {this.fetchURL = 'http://localhost:7000'; }
    this.newBook = {
      "title":"",
      "type":"",
      "author":"",
      "numberPages":0,
      "dateOfPub":0,
      "url":"",
      "isbn":"",
      "siteLocation":"",
      "numberOfCopies":0,
      "comments":""
    };
    console.log(this.newBook);
  }
  types=["Book", "PDF", "Webpage"];
  newBook = null;
  CSVFilePath="";
  fileList="";

  createBook(){
    console.log(this.newBook);
    if(this.newBook.type != 0){
      this.newBook.type=this.types[this.newBook.type-1];
    }else{
      this.newBook.type="None chosen";
    }
    this.httpClient.fetch(this.fetchURL + "/book/", {
      method:"post",
      body:json(this.newBook)
    })
    .then(response=>response.json())
    .then(data=>{
      console.log("Posted data");
      console.log(data);
    });
  }

  createBooksFromCSV(){
    if(CSVFilePath.files!=""){
      //let filestring = "";\
      //TODO: Parse all csv files
      console.log (CSVFilePath.files[0]);

      function loaded (evt) {
      // Obtain the read file data
      var fileString = evt.target.result;
      console.log (fileString);
      const csvjson = require('csvjson');
      var jsonObj = csvjson.toObject(fileString);
      console.log ('json created ' + JSON.stringify(jsonObj));
    }
    function errorHandler(evt) {
  if(evt.target.error.name == "NotReadableError") {
    alert('The file could not be read');
      }
    }
  var reader = new FileReader();

      reader.readAsText(CSVFilePath.files[0]);
      // console.log (reader.result);
      // var csvText = reader.result;
      //
      // console.log (csvText);
      reader.onload = loaded;
      reader.onerror = errorHandler;
    }
  }


 // function loadHandler(event) {
 //             var csv = event.target.result;
 //         console.log (csv);
 //          }

    // function errorHandler(event) {
    //      if(event.target.error.name == "NotReadableError") {
    //           alert("Cannot read file !");
    //      }
    //   }





      // console.log ('selectedFiles ' + CSVFilePath.value);
      // var binaryData = [];
      // binaryData.push(CSVFilePath.value);
      // var pathToFile = URL.createObjectURL(new Blob (binaryData));
      // console.log ('path to file ' + pathToFile);
      // //
      // const csvjson = require('csvjson');
      // //   //var data = fs.readFileSync(path.join(_dirname, CSVFilePath), { encoding : 'utf8'});
      // var jsonObj = csvjson.toObject(CSVFilePath.value);
      // console.log ('json created ' + jsonObj);
      // }

}
