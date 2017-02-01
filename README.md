# ourhandsandfeet
[![CircleCI](https://circleci.com/gh/UltimatePromotions/ourhandsandfeet.svg?style=svg)](https://circleci.com/gh/UltimatePromotions/ourhandsandfeet)

## Helping Charities find volunteers

This is the front end for the ourhandsandfeet.org web app. Here are the steps to get the development version running. First, you should probably check the <a href="https://docs.google.com/document/d/1_QDDbqmBrJuGqBoib59fmgYtls03dAXXuLqRR5roPO4/edit">"Getting started"</a> document to make sure you have all of the necessary prerequisites installed.

Clone this repository into a directory of your choice from the terminal using "git clone [url of this repository]
Install and use the version of nodejs currently listing in our package.json<br>
From the same directory, run <b>npm install</b><br>

Run <b>npm start</b>
Install the <b>Aurelia Inspector</b> Chrome extension to allow debugging of the font end code.

Now, open your browser and go to <b>localhost:9000</b>

If all goes well, the webpage should be running correctly.

<b><i>Note</b></i>  you will not be able to use the "Login" feature of the website unless you also run the back end server.

When working on unit tests, use the command <b>npm run test:debug</b><br>
This will run the tests in continuous mode and launch a Chrome browser with Karma debugging enabled.

Since we are running some alpha and beta node packages, there will be times when the developer will need to reinstall all dependencies.
We have found that is can be necessary to delete the entire Node_Modules folder and then clean the cache. Run this command:<br>
<b>rm -rf node_modules && npm cache clean</b><br>Then <b>npm install</b>
