var gulp = require("gulp");

gulp.task("copy", function () {
  return gulp
    .src([
      "server/src/views*/*",
      "server/src/static*/**/*",
      "server/package.json",
      "server/processes.json",
    ])
    .pipe(gulp.dest("./server/build/"));
});

gulp.task(
  "default",
  gulp.series("copy", (cb) => {
    cb();
  })
);
