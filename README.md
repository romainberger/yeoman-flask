# Yeoman Flask Generator

  Generator to use Yeoman on a Flask project.

  For more information about Yeoman, see [Yeoman.io](http://yeoman.io/)

  For more information about Flask, see [Flask.pocoo.org](http://flask.pocoo.org/)

## Installation

  `$ npm install -g generator-flask`

## Documentation

### Init

  `$ yo flask` - Generates a new Flask app with all the basic files you need.

### Server

  Flask needs a development server to run in order to serve the application. To do so, run `$ ./server`. And to make Yeoman compile your compass stylesheets, run (in a separate terminal tab) `$ yeoman server`. Your application will be available at `127.0.0.1:5000`.

### Build

  If you decided to use [Frozen Flask](http://packages.python.org/Frozen-Flask/), run `$ python freeze.py` to build a static version of your app.
