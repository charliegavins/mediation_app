const gulp = require('gulp');

//here the default task is defined, called 'build-app' within which we start the gulp tasks 'serve' and 'watch' - which will be commented in those files respectively

const defaultTask = () => {
  return gulp.start(['serve', 'watch']);
};

gulp.task('default', ['build-app'], defaultTask);
module.exports = defaultTask;
