const gulp             = require('gulp');
//deletes files when passed a directory location, not now used in favour of the built-in 'del' module in node
const clean            = require('gulp-clean');
// const del              = require('del');
const gulpIf           = require('gulp-if');
const eventStream      = require('event-stream');
//minify images
const imagemin         = require('gulp-imagemin');
const browserSync      = require('browser-sync');
const config           = require('../package').gulp;

//deletes the images in the destination folder found in the package.json. Updated this from original on NPM's recommendation that 'clean' is now deprecated. Possible issue - original commented out code below
// const cleanImages = () => {
//   return del(`${config.dest.images}${config.selectors.images}`);
// };

const cleanImages = () => {
  return gulp.src(config.dest.images, { read: false })
    .pipe(clean());
};

//copies images from SRC to public, whilst applying the image minifyer which compresses the images based on a couple of parameters
const copyImages = () => {
  return gulp.src(`${config.src.images}${config.selectors.images}`)
    .pipe(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(config.dest.images));
};

//runs the two above functions in succession, also running browserSync
const buildImages = () => {
  return eventStream.merge(
    cleanImages(),
    copyImages()
  )
  .pipe(gulpIf(!global.production, browserSync.stream()));
};

gulp.task('build-images', buildImages);
module.exports = buildImages;
