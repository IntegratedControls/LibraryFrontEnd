import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

//import { bindable } from 'aurelia-framework';

// const fetch = !self.fetch ? System.import('isomorphic-fetch') : Promise.resolve(self.fetch);
//const booksUrl = process.env.BackendUrl + '/book/getall';

@inject(HttpClient)
export class Bookshelf {
  constructor(httpClient){
    this.httpClient = httpClient;
    this.filterType = '';
  }
  mediaTypes = ['hardback', 'paperback', 'pdf', 'webpage', 'video', 'audiobook', 'template'];
  selectedMediaTypes = [];
  siteLocations = [];
  filterby = ['keyword', 'media type', 'site location'];

  async activate(){
    await fetch;

    this.httpClient.configure(config => {
      config
      .useStandardConfiguration()
      .withBaseUrl(process.env.BackendUrl);
    });

    const res = await this.httpClient.fetch('/book/getall');
    this.books =  await res.json();
    this.populateTypes();
    this.populateSites();
    // this.getMediaTypes();
  }

  filters = [
    {value: '', keys: ['title', 'type', 'author', 'numberPages', 'dateOfPub', 'siteLocation', 'access']},
    {value: '', keys: ['type']},
    {value: '', keys: ['siteLocation']}
  ];

  populateTypes(){
    this.mediaTypes.push('');
    for (let next of this.books){
      let nextType = next.type;
      /* istanbul ignore else */
      if (this.mediaTypes.indexOf(nextType) === -1){
        this.mediaTypes.push(nextType);
      }
    }
  }

  populateSites(){
    this.siteLocations.push('');
    for (let next of this.books){
      let nextSite = next.siteLocation;
      /* istanbul ignore else */
      if (this.siteLocations.indexOf(nextSite) === -1){
        this.siteLocations.push(nextSite);
      }
    }
  }

  // getMediaTypes(){
  //   this.selectedMediaTypes.push('');
  //   for (let next of this.books){
  //     let nextType = next.type;
  //     /* istanbul ignore else */
  //     if (this.selectedMediaTypes.indexOf(nextType) === -1){
  //       this.selectedMediaTypes.push(nextType);
  //       return this.selectedMediaTypes;
  //     }
  //   }
  // }

  setFilter(){
    this.filterType = this.filterby[this.filterType - 1];
    console.log(this.filterType);
  }
}
