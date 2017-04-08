var gulp = require('gulp'),
    electron = require('electron-connect').server.create(),
    ts = require('gulp-typescript');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('watch', function () {
  electron.start();
  gulp.watch('src/**/*.ts', function () {
    gulp.src(['src/**/*.ts', 'typings/**/*.ts'])
        .pipe(tsProject())
        .pipe(gulp.dest('build'));
  });
  gulp.watch(['views/*.html'], electron.reload);
  gulp.watch(['build/**/*.js'], electron.restart);
});
