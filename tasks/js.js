const gulp             = require('gulp');
const gulpIf           = require('gulp-if');
const bowerFiles       = require('main-bower-files');
const concat           = require('gulp-concat');
//jshint detects errors and potential problems in javascript code
const jshint           = require('gulp-jshint');
const order            = require('gulp-order');
//babel converts ES6 etc into older versions of the code to ensure maximum compatibility
const babel            = require('gulp-babel');
const eventStream      = require('event-stream');
const sourcemaps       = require('gulp-sourcemaps');
const uglify           = require('gulp-uglify');
const rename           = require('gulp-rename');
const browserSync      = require('browser-sync');
const config           = require('../package').gulp;

//fetch js from bower files and concat the files together
const fetchVendorJs = () => {
  return gulp.src(bowerFiles(config.selectors.js))
    .pipe(concat(config.vendor.js));
};

//this 'validates' the locally sourced javascript using jshint which detects common errors and potential problems
const validateLocalJs = () => {
  return gulp.src(`${config.src.js}${config.selectors.js}`)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', {beep: true}));
};

//fetch the local javascript, put it in the following order, and convert any JS written in ES2015 to ES5
const fetchLocalJs = () => {
  return validateLocalJs()
    .pipe(order([config.main.js, config.selectors.js]))
    .pipe(babel({
      presets: ['es2015']
    }));
};


//punchy build function
const buildJs = () => {
//merges data of above functions into same stream so can be put down the pipes
  return eventStream.merge(
    fetchVendorJs(),
    fetchLocalJs()
  )
  //ensure correct order of data going through the pipe
  .pipe(order([config.vendor.js, config.selectors.js]))
  // concat files together
  .pipe(concat(config.output.js))
  // uglify the JS which minimises it, and then add the .min suffix to the file name. Happens between the init() and the write() functions
  .pipe(sourcemaps.init())
  .pipe(gulpIf(global.production, uglify()))
  .pipe(gulpIf(global.production, rename({ suffix: '.min' })))
  .pipe(sourcemaps.write())
  //defines the destination location of the JS taken from the package.json file
  .pipe(gulp.dest(config.dest.js))
  //if global environment is not set to production then fire the browsersync function
  .pipe(gulpIf(!global.production, browserSync.stream()));
};

//module exports
gulp.task('build-js', buildJs);
module.exports = buildJs;
