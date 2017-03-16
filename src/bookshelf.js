import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

//import { bindable } from 'aurelia-framework';

// const fetch = !self.fetch ? System.import('isomorphic-fetch') : Promise.resolve(self.fetch);
//const booksUrl = process.env.BackendUrl + '/book/getall';

@inject(HttpClient)
export class Bookshelf {
  constructor(httpClient){
    this.httpClient = httpClient;
  }
  mediaTypes = [];

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
  }

  filters = [
    {value: '', keys: ['title', 'type', 'author', 'numberPages', 'dateOfPub', 'siteLocation', 'access']},
    {value: '', keys: ['type']}
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
}
