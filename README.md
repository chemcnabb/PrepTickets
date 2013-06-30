PrepTickets
===========

The full PrepTickets UI


# Developer

## Setup

### Requirements
  * [Node.js](http://nodejs.org/) and [npm](https://npmjs.org/)
  * [Bower](http://bower.io/)

    `npm install -g bower`

  * [CoffeeScript](http://coffeescript.org/)

    Install: `npm install -g coffee-script`

  * [Ruby](http://www.ruby-lang.org/en/)
  * [Bundler Gem](http://gembundler.com/)

    Install: `gem install bundler`

### Things to lookout for
**NEVER EDIT COMPILED JAVASCRIPT FILES**

CoffeeScript compiles to JS, but it will overwrite any changes done to the compiled JS.
You can tell a file has been compiled by CoffeeScript by the first line saying: 

```Javascript
// Generated by CoffeeScript 1.6.3
```


## Programming

### Before starting

To improve ease of programming, we've used Ruby to speedup building. Before you can start programming, you need to make sure you have the required gems by running this command (in the root of the project):

```
bundle install
```

This will go and download all the requirements (you might need to do this every time new code gets pulled and the Gemfile or Gemfile.lock is changed)

### Running web server

To view the project in your browser, run this command (from the project directory):

```
  bundle exec rackup
```

Then you can visit the project at [http://localhost:8000/](http://localhost:8000/)


### Compile CoffeeScript

This will be done by sprockets (in ruby) via the web server

### Compile SCSS

This will be done by sprockets (in ruby) via the web server

## Testing

The following has been taken from [AngularJS docs](https://github.com/angular/angular-seed)

### Running unit tests

We recommend using [jasmine](http://pivotal.github.com/jasmine/) and
[Karma](http://karma-runner.github.io) for your unit tests/specs, but you are free
to use whatever works for you.

Requires [node.js](http://nodejs.org/), Karma (`sudo npm install -g karma`) and a local
or remote browser.

* start `scripts/test.sh` (on windows: `scripts\test.bat`)
  * a browser will start and connect to the Karma server (Chrome is default browser, others can be captured by loading the same url as the one in Chrome or by changing the `config/karma.conf.js` file)
* to run or re-run tests just change any of your source or test javascript files


### End to end testing

Angular ships with a baked-in end-to-end test runner that understands angular, your app and allows
you to write your tests with jasmine-like BDD syntax.

Requires a webserver, node.js + `./scripts/web-server.js` or your backend server that hosts the angular static files.

Check out the
[end-to-end runner's documentation](http://docs.angularjs.org/guide/dev_guide.e2e-testing) for more
info.

* create your end-to-end tests in `test/e2e/scenarios.js`
* serve your project directory with your http/backend server or node.js + `scripts/web-server.js`
* to run do one of:
  * open `http://localhost:port/test/e2e/runner.html` in your browser
  * run the tests from console with [Karma](http://karma-runner.github.io) via
    `scripts/e2e-test.sh` or `script/e2e-test.bat`

## Deploying

### Rendering required files

It's very simple to build the application for production, simple run the fullying command (in the root directory)

```
bundle exec rake render
```

This will take a few moments to compile the project and write it to the /build directory (in the root directory)
The build directory will contain everything you need to run the app, just upload the contents of the build directory to a server and you're ready to go!
