var gulp = require("gulp");

gulp.task("copy", function () {
  return gulp
    .src([
      "server/src/views*/*",
      "server/src/db*/*",
      "server/src/static*/**/*",
      "server/package.json",
    ])
    .pipe(gulp.dest("./server/build/"));
});

gulp.task(
  "default",
  gulp.series("copy", (cb) => {
    cb();
  })
);
