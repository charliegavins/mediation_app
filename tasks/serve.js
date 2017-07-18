const gulp        = require('gulp');
//nodemon automatically restarts the application if any of the source code is changed. nodemon without gulp doesn't allow for pre-build cleanup or compilation of code. this is why we use it with gulp.
const nodemon     = require('gulp-nodemon');
//browserSync allows us to build whilst testing in multiple environments, keeping all active windows in sync
const browserSync = require('browser-sync').create();

const config      = require('../package').gulp;

const serve = () => {
  let started = false;

//initialize browserSync to run on the local proxy of 4000, watching all of the files in the public folder for changes. If they change, then reload the browser.
browserSync.init(null, {
  proxy: 'http://localhost:3000',
  files: ['public/**/*.*'],
  browser: 'google chrome',
  port: 7000,
  reloadDelay: 1000
});

//this runs nodemon in development environment, which listens for changes and refreshes server. If the server refreshes it also reloads browserSync
return nodemon({
  script: config.main.server,
  ignore: [config.destDir, config.srcDir],
  env: { NODE_ENV: 'development' }
})
.on('start', () => {
  if (!started) {
    browserSync.reload();
  } else {
    started = false;
  }
});
};

gulp.task('serve', serve);
module.exports = serve;
