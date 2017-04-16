var gulp = require("gulp"),
    electron = require("electron-connect").server.create(),
    ts = require("gulp-typescript"),
    sass = require("gulp-sass");

var tsProject = ts.createProject("tsconfig.json");

gulp.task("watch", function () {
  electron.start();
  gulp.watch(["src/**/*.ts"], ["ts"]);
  gulp.watch(["styles/**/*.scss"], ["sass"]);
  gulp.watch(["resources/*.html"], electron.reload);
  gulp.watch(["src/**/*.html"], electron.reload);
  gulp.watch(["build/**/*.js"], electron.restart);
  gulp.watch(["build/**/*.css"], electron.restart);
});

gulp.task("build", ["ts", "sass"]);

gulp.task("ts", function () {
    return gulp.src(["src/**/*.ts"])
        .pipe(tsProject())
        .pipe(gulp.dest("build"));
});

gulp.task("sass", function () {
    return gulp.src(["styles/**/*.scss"])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("build"));
});
