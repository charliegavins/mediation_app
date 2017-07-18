const gulp             = require('gulp');
const gulpIf           = require('gulp-if');
const clean            = require('gulp-clean');
// const del              = require('del');
const eventStream      = require('event-stream');
const browserSync      = require('browser-sync');
const config           = require('../package').gulp;

//delete destination folder of fonts
// const cleanFonts = () => {
//   return del(`${config.dest.fonts}${config.selectors.fonts}`);
// };
const cleanFonts = () => {
  return gulp.src(config.dest.fonts, { read: false })
    .pipe(clean());
};

//copy fonts from source to dest
const copyFonts = () => {
  return gulp.src(`${config.src.fonts}${config.selectors.fonts}`)
    .pipe(gulp.dest(config.dest.fonts));
};

//run function which builds cleans and copys fonts
const buildFonts = () => {
  return eventStream.merge(
    cleanFonts(),
    copyFonts()
  )
  .pipe(gulpIf(!global.production, browserSync.stream()));
};

gulp.task('build-fonts', buildFonts);
module.exports = buildFonts;
