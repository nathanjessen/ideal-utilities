var dagger = require('dagger-tasks');
var gulp = require('gulp');
var deploy = require('gulp-gh-pages');

var settings = {
  browsersync: {
    files: ['./dist/docs/**'],
    source: './dist/docs',
    destination: [
      '**/*.scss',
      '!bower_components/**/*.scss',
      '!node_modules/**/*.scss'
    ]
  },
  sass_production: {
    browsers: ['last 2 versions', '> 5%', 'not ie < 11'],
    source: [
      '**/*.scss',
      '!**/_*.scss',
      '!bower_components/**/*.scss',
      '!node_modules/**/*.scss'
    ],
    destination: './dist'
  }
};

dagger(settings);

/* Deploy build to gh-pages */
gulp.task('deploy', ['build:production'], function () {
  return gulp.src('./dist/docs/**/*')
    .pipe(deploy())
});
