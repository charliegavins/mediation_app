const gulp             = require('gulp');
//to use gulp to compile sass files into public CSS
const sass             = require('gulp-sass');
//adds prefixes to the css file which allows for maximum device compatibility
const autoprefixer     = require('gulp-autoprefixer');
//strips all comments from CSS
const stripCssComments = require('gulp-strip-css-comments');
//minifys the css
const minifycss        = require('gulp-minify-css');
//this gives an array of bower component directory addresses
const bowerFiles       = require('main-bower-files');
// this concats multiple files into one file for computational efficiency
const concat           = require('gulp-concat');
//this creates a stream of data that allows us to performs operations on it
const eventStream      = require('event-stream');
//this allows to reorder a stream of files which might have otherwise been reordered due to different processing times
const order            = require('gulp-order');
//This embeds source maps into the source file
const sourcemaps       = require('gulp-sourcemaps');
//this renames files - in this case .min is added for minimised files
const rename           = require('gulp-rename');
//e.g.: .pipe(gulpif(condition, uglify())) Only uglify the content if the condition is true
const gulpIf           = require('gulp-if');
//refreshes browsers if a change is made
const browserSync      = require('browser-sync');
const config           = require('../package').gulp;

//fetch the CSS files that are found in the bower packages. process, strip out the comments (/sourcemaps) and concat them all
const fetchVendorCss = () => {
  return gulp.src(bowerFiles(config.selectors.css))
    .pipe(stripCssComments()) // Removing the sourcemaps
    .pipe(concat(config.vendor.css));
};

//fetch the local SCSS files
//  - compile them in expanded mode for debugging
//  - add autoprefixer onto them for maximum device compatibility
//  - concat the files
const fetchLocalCss = () => {
  return gulp.src(`${config.src.scss}${config.main.scss}`)
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(concat(config.output.css));
};


const buildCss = () => {
//define constants for the functions defined above
  const vendorCss = fetchVendorCss();
  const localCss  = fetchLocalCss();

//process both local and vendor css in the same way and merge them
  return eventStream.merge(vendorCss, localCss)
//ensure the order is maintained with vendorCss first
    .pipe(order([config.vendor.css,config.output.css]))
//concat the output between vendor and local
    .pipe(concat(config.output.css))
//in between init and wrie embeds and changes the body of the css files
    .pipe(sourcemaps.init())
    .pipe(gulpIf(global.production, minifycss()))
    .pipe(gulpIf(global.production, rename({ suffix: '.min'   })))
    .pipe(sourcemaps.write())
//defines the destination of the completed CSS file
    .pipe(gulp.dest(config.dest.css))
//if the environment isn't set to production, then run browsersync
    .pipe(gulpIf(!global.production, browserSync.stream()));
};

//export the module
gulp.task('build-css', buildCss);
module.exports = buildCss;
