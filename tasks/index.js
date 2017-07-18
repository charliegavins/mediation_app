const gulp             = require('gulp');
const gulpIf           = require('gulp-if');
const htmlhint         = require('gulp-htmlhint');
const htmlmin          = require('gulp-htmlmin');
const inject           = require('gulp-inject');
const browserSync      = require('browser-sync');
const config           = require('../package').gulp;

//check for obvious errors in index using htmlhint
const validateIndex = () => {
  return gulp.src(`${config.srcDir}${config.main.index}`)
  .pipe(htmlhint({'doctype-first': false}))
  .pipe(htmlhint.reporter('htmlhint-stylish'));
};

//grab the javascript and css files
const buildIndex = () => {
  const js  = require('./js')();
  const css = require('./css')();

  return validateIndex()
    // write first to get relative path for inject, inject the CSS and JS files, minify html and reload browsers if needed
    .pipe(gulp.dest(config.destDir))
    .pipe(inject(js, {relative: true}))
    .pipe(inject(css, {relative: true}))
    .pipe(gulpIf(global.production, htmlmin({collapseWhitespace: true, removeComments: true})))
    .pipe(gulp.dest(config.destDir))
    .pipe(gulpIf(!global.production, browserSync.stream()));
};

gulp.task('build-index', buildIndex);
module.exports = buildIndex;
