const gulp             = require('gulp');
//access the gulp object within the package.json file
const config           = require('../package').gulp;

// gulp.watch: watch files and do something when a file changes. This always returns an EventEmitter that emits change events. Here we reference the file paths that are made in the package.json
const watch = () => {
  //watch for changes in the SCSS files, if changes, run build-css
  gulp.watch([
    `${config.src.scss}${config.selectors.scss}`,
    `${config.src.scss}${config.main.scss}`
  ], ['build-css']);
  gulp.watch(`${config.src.js}${config.selectors.js}`, ['build-js']);
  gulp.watch(`${config.src.images}${config.selectors.images}`, ['build-images']);
  gulp.watch(`${config.src.fonts}${config.selectors.fonts}`, ['build-fonts']);
  gulp.watch(`${config.src.js}${config.selectors.html}`, ['build-partials']);
  gulp.watch(`${config.srcDir}${config.main.index}`, ['build-index']);
};

gulp.task('watch', watch);
module.exports = watch;
