const gulp    = require('gulp');
const postcss = require('gulp-postcss');
const mdcss   = require('mdcss');

var documentation = function documentation(settings) {

  var processors = [
    mdcss({
      destination: settings.destination
    })
  ];

  var task = gulp
    .src(settings.source)
    .pipe(postcss(processors))
    .pipe(gulp.dest(settings.destination));

  return task;
};

module.exports = documentation;
