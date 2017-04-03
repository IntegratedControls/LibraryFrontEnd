import {bindable} from 'aurelia-framework';

export class Home {

  @bindable
  columnWidth = '450px';

  get widescreen(){
    let iswidescreen = false;
    let currentscreenwidth = document.documentElement.clientWidth;
    /* istanbul ignore else */
    if (currentscreenwidth > 766){
      iswidescreen = true;
      this.columnWidth = '450px';
    } else {
      this.columnWidth = 'auto';
    }
    return iswidescreen;
  }
}
