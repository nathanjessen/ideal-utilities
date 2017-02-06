const gulp         = require('gulp');
const postcss      = require('gulp-postcss');
const immutableCss = require('immutable-css');
const reporter     = require('postcss-reporter');
const syntax_scss  = require('postcss-scss');
const stylelint    = require('stylelint');

var sass_lint = function sass_lint(settings) {

  var processors = [
    stylelint(),
    immutableCss(),
    reporter({
      clearReportedMessages: true
    })
  ];

  var task = gulp
    .src(settings.source)
    .pipe(postcss(processors, {syntax: syntax_scss}));

  return task;
};

module.exports = sass_lint;
