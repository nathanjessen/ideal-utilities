const docRoot = 'docs';
const dist = 'dist';
const projectName = 'Ideal Utilities';
const scssFiles = ['ideal.scss', 'lib/*.scss'];

const browserSync  = require('browser-sync').create();
const gulp         = require('gulp');
const cssnano      = require('gulp-cssnano');
const notify       = require('gulp-notify');
const postcss      = require('gulp-postcss');
const rename       = require('gulp-rename');
const sass         = require('gulp-sass');
const size         = require('gulp-size');
const sourcemaps   = require('gulp-sourcemaps');
const immutableCss = require('immutable-css');
const mdcss        = require('mdcss');
const cssnext      = require('postcss-cssnext');
const reporter     = require('postcss-reporter');
const stylelint    = require('stylelint');
const syntax_scss  = require('postcss-scss');

// PostCSS Processors
const processors = [
  cssnext({
    browsers: ['last 2 versions', '> 5%', 'not ie < 11']
  })
];

// Styles
gulp.task('sass:development', function () {
  return gulp.src('ideal.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dist));
});

gulp.task('sass:lint', function () {
  return gulp.src(scssFiles)
    .pipe(postcss([
      stylelint(),
      immutableCss(),
      reporter({
        clearReportedMessages: true
      })
    ], {
      syntax: syntax_scss
    }));
});

gulp.task('sass:production', function () {
  return gulp.src('ideal.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest(dist))
    .pipe(cssnano())
    .pipe(rename({extname: '.min.css'}))
    .pipe(size())
    .pipe(gulp.dest(dist));
});

// Documentation
gulp.task('docs', ['sass:development'], function () {
  return gulp.src('dist/ideal.css')
    .pipe(postcss([
      mdcss({
        destination: docRoot
      })
    ]))
    .pipe(gulp.dest(docRoot));
});

// BrowserSync
gulp.task('serve', () => {
  browserSync.init({
    files: [docRoot + '/**'],
    port: 4000,
    server: {
      baseDir: docRoot
    }
  });

  // Watch
  gulp.watch(scssFiles, ['docs', 'sass:lint']);
});

// Default
gulp.task('default', ['sass:development']);

// Development
gulp.task('dev', ['docs', 'serve']);
