# Yeoman Flask Generator

  Generator to use Yeoman on a Flask project.

  For more informations about Yeoman, see [Yeoman.io](http://yeoman.io/)

  For more informations about Flask, see [Flask.pocoo.org](http://flask.pocoo.org/)

## Installation

  `$ sudo npm install -g yeoman-flask`

  This will install the generator globally so you will be able to use it everywhere.

  You may need to re-install the generator every time you update Yeoman.

  If the install script failed, here is how to install it manually:

  * `$ cd /usr/local/lib/node_modules/yeoman/node_modules/yeoman-generators/lib/generators`
  * `$ git clone git://github.com/romainberger/yeoman-flask.git` (you may need to run this with `sudo`)

## Documentation

### Init

  `$ yeoman init yeoman-flask` - Generates a new Flask app with all the basic files you need.

### Server

  Flask needs a development server to run in order to serve the application. To do so, run `$ ./server`. And to make Yeoman compile your compass stylesheets, run (in a separate terminal tab) `$ yeoman server`. Your application will be available at `127.0.0.1:5000`.

  The fact that both commands need to run simultaneously is pretty boring (and the fact that you can't enjoy the livereload) and I will be working on a solution soon.

### Build

  If you decided to use [Frozen Flask](http://packages.python.org/Frozen-Flask/), run `$ python freeze.py` to build a static version of your app.

  For now this does not creates an optimized version like Yeoman is supposed to do (by minifying the css and js files and all the other things). This is also something I will be working on in the future.
