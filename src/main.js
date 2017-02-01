// we want font-awesome to load as soon as possible to show the fa-spinner
import '../styles/styles.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import config from '../authConfig';
import {load} from 'aurelia-environment';
//var ap = require('aurelia-polymer');
// comment out if you don't want a Promise polyfill (remove also from webpack.common.js)

import * as Bluebird from 'bluebird';
Bluebird.config({ warnings: false });

export async function configure(aurelia) {
  load().then(() => {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();
    aurelia.use.plugin('aurelia-polymer');
    aurelia.use.plugin('aurelia-auth', (baseConfig)=>{
         baseConfig.configure(config);
          });
    aurelia.use.plugin('aurelia-environment');
    aurelia.use.plugin('au-table');
    //aurelia.use.plugin('aurelia-files');
  // Uncomment the line below to enable animation.
  // aurelia.use.plugin('aurelia-animator-css');
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin('aurelia-html-import-template-loader')

  aurelia.start().then(() => aurelia.setRoot());

  });
  // if you would like your website to work offline (Service Worker),
  // install and enable the @easy-webpack/config-offline package in webpack.config.js and uncomment the following code:
  /*
  const offline = await System.import('offline-plugin/runtime');
  offline.install();
  */
}
