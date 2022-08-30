const gulp = require('gulp');
gulp.task('copy', function () {
  gulp
    .src([
      'server/src/views*/**',
      'server/package.json',
      'server/ecosystem.config.js',
    ])
    .pipe(gulp.dest('./dist/server/'));
  gulp.src(['docker/**']).pipe(gulp.dest('./dist'));
  return gulp
    .src(['server/src/static/previewer*/**'])
    .pipe(gulp.dest('./dist/server/static/'));
});
gulp.task(
  'default',
  gulp.series('copy', (cb) => {
    cb();
  })
);
