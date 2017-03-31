# CST Library
[![CircleCI](https://circleci.com/gh/IntegratedControls/LibraryFrontEnd.svg?style=svg)](https://circleci.com/gh/IntegratedControls/LibraryFrontEnd)

## Bringing book awareness to you

This is the front end for the CST Library web app. Here are the steps to get the development version running. First, you should check the <a href="https://ge.box.com/s/eci3k4dy0cvc1bo3zq0mic1cmy3w1sg9">"Getting started"</a> document to make sure you have all the necessary prerequisites installed.

Clone this repository into a directory of your choice from the terminal using <b>git clone [url of this repository]</b>. Install and use the version of nodejs currently listed in our package.json.

Create a <b>.env</b> file at the project root and request the contents from <b>Integrated.Controls.adm@gmail.com</b>.<br> 
<b><i>Note</i></b> you will not be able to build without this file.

From the same directory, run <b>npm run cleaninstall</b><br>
the run <b>npm start</b> to start the development server.

Install the <b>Aurelia Inspector</b> Chrome extension to allow debugging of the front end code.

Now, open your browser and go to <b>localhost:9000</b>. The webpage should open and run without errors.<br>
<b><i>Note</i></b> you will not be able to use the "Login" feature of the website unless you also run the back end server.

When working on unit tests, use the command <b>npm run test:debug</b><br>
This will run the tests in continuous mode and launch a Chrome browser with Karma debugging enabled.

To get the latest version of code, <b>git pull origin dev</b> and switch to your own branch.

Please do not push your changes directly to the dev branch, rather push to your own branch and then submit a pull request to the <b>dev</b> branch.

Since we are running some alpha and beta node packages, there will be times when the you will need to reinstall all dependencies.
We have found that it is often necessary to delete the entire Node_Modules folder and then clean the cache by running this script: <b>npm run cleaninstall</b>

Before you push new code to GitHub, be sure to run this script: <b>npm run installtest</b>
