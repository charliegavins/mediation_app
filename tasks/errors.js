const gulp             = require('gulp');
//sends error messages back to command line
const notify           = require('gulp-notify');
//plumber replaces pipe method, which unpipes streams on error, and feeds them into something, in this case the 'notify' package, with the const onError as the argument
const plumber          = require('gulp-plumber');

const onError = function(err) {
  notify.onError({
    title: 'Something went wrong!',
    subtitle: 'Plugin: <%= error.plugin %>',
    message: 'Error: <%= error.message %>',
    sound: 'Beep'
  })(err);
  this.emit('end');
};

const gulpSrc = gulp.src;

gulp.src = function() {
  return gulpSrc.apply(gulp, arguments)
    .pipe(plumber({ errorHandler: onError })
  );
};
