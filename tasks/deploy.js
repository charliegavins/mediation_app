const gulp             = require('gulp');


//type command gulp deploy to deploy application and set the global variable to production
gulp.task('deploy', () => {
  global.production = true;
  return gulp.start(['build-app']);
});
