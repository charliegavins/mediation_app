const gulp             = require('gulp');
const gulpIf           = require('gulp-if');
const htmlhint         = require('gulp-htmlhint');
const htmlmin          = require('gulp-htmlmin');
const browserSync      = require('browser-sync');
const config           = require('../package').gulp;

//html hint validates the html and displays simple mistakes
const validatePartials = () => {
  return gulp.src(`${config.src.js}${config.selectors.html}`)
  .pipe(htmlhint({'doctype-first': false}))
  .pipe(htmlhint.reporter('htmlhint-stylish'));
};

//if the global environment is set to production then collapse the whitespace and remove comments and copy it to destination file, reloading browsers (only if not production)
const buildPartials = () => {
  return validatePartials()
    .pipe(gulpIf(global.production, htmlmin({collapseWhitespace: true, removeComments: true})))
    .pipe(gulp.dest(config.dest.js))
    .pipe(gulpIf(!global.production, browserSync.stream()));
};

gulp.task('build-partials', buildPartials);
module.exports = buildPartials;
