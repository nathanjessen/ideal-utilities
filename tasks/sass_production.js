const gulp         = require('gulp');
const cssnano      = require('gulp-cssnano');
const postcss      = require('gulp-postcss');
const rename       = require('gulp-rename');
const sass         = require('gulp-sass');
const cssnext      = require('postcss-cssnext');

var sass_production = function sass_production(settings) {
  var nano_options = {
    options: {
      sourcemap: false
    }
  };

  var processors = [
    cssnext({
      browsers: settings.browsers
    })
  ];

  var task = gulp
    .src(settings.source)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(cssnano(nano_options))
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest(settings.destination));

  return task;
}

module.exports = sass_production;
