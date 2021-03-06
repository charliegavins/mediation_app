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
  // watch for changes in javascript files, if there are changes then run build-js
  gulp.watch(`${config.src.js}${config.selectors.js}`, ['build-js']);
  // watch for changes in the images folder, if there are changes then run build-images
  gulp.watch(`${config.src.images}${config.selectors.images}`, ['build-images']);
  //watch fonts folder for changes and print new code accordingly
  gulp.watch(`${config.src.fonts}${config.selectors.fonts}`, ['build-fonts']);
  //if change build html partials
  gulp.watch(`${config.src.js}${config.selectors.html}`, ['build-partials']);
  // if changes, build main index.html
  gulp.watch(`${config.srcDir}${config.main.index}`, ['build-index']);
};

//export
gulp.task('watch', watch);
module.exports = watch;
