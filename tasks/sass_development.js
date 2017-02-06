const gulp       = require('gulp');
const sass       = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

var sass_development = function sass_development(settings) {

  var task = gulp
    .src(settings.source)
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(settings.destination));

  return task;
};

module.exports = sass_development;
