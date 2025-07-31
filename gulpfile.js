import gulp from 'gulp';
import sass from 'gulp-sass';
import * as dartSass from 'sass';
import concat from 'gulp-concat';

const scss = sass(dartSass);

gulp.task('styles', function () {
  return gulp.src('src/styles/**/*.scss')
    .pipe(scss().on('error', scss.logError))
    .pipe(concat('simple-daggerheart.css'))
    .pipe(gulp.dest('compiled'));
});