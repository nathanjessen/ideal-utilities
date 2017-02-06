const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const runSequence = require('run-sequence');

const documentation = require('./tasks/documentation');
const sass_development = require('./tasks/sass_development');
const sass_lint = require('./tasks/sass_lint');
const sass_production = require('./tasks/sass_production');

const default_settings = require('./config');
const user_settings = {};
const settings = Object.assign({}, default_settings, user_settings);

gulp.task('documentation', function() {
  return documentation(settings.documentation);
});

gulp.task('sass:lint', function() {
  return sass_lint(settings.sass_lint);
});

gulp.task('sass:development', ['sass:lint'], function() {
  return sass_development(settings.sass_development);
});

gulp.task('sass:production', ['sass:lint'], function() {
  return sass_production(settings.sass_production);
});

gulp.task('build:production', function(callback) {
  runSequence('sass:development', 'documentation', 'sass:production', callback);
});

gulp.task('watch', ['documentation'], function() {
  browserSync.init({
    files: settings.browsersync.files,
    port: 4000,
    server: {
      baseDir: settings.browsersync.source
    }
  });

  gulp.watch(settings.browsersync.destination, ['sass:development', 'documentation']);
});

gulp.task('default', ['watch']);
