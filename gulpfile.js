const docRoot = 'docs';
const dist = 'dist';
const projectName = 'Ideal Utilities';
const cssFiles = ['index.css', 'lib/*.css'];

const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const notify = require('gulp-notify');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const size = require('gulp-size');
const sourcemaps = require('gulp-sourcemaps');
const immutableCss = require('immutable-css');
const mdcss = require('mdcss');
const atVariables = require('postcss-at-rules-variables');
const atIf = require('postcss-conditionals');
const cssnext = require('postcss-cssnext');
const cssEach = require('postcss-each');
const atFor = require('postcss-for');
const atImport = require('postcss-import');
const reporter = require('postcss-reporter');
const stylelint = require('stylelint');

// PostCSS Processors
const processors = [
  atImport(),
  stylelint(),
  immutableCss(),
  reporter({
    clearReportedMessages: true
  }),
  atVariables(),
  atFor(),
  cssEach(),
  atIf(),
  cssnext({
    browsers: ['last 2 versions', '> 5%', 'not ie < 11']
  })
];

// CSS
gulp.task('css', function () {
  return gulp.src('index.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dist))
    .pipe(cssnano())
    .pipe(rename({extname: '.min.css'}))
    .pipe(size())
    .pipe(gulp.dest(dist));
});

// Documentation
gulp.task('docs', ['css'], function () {
  return gulp.src('dist/index.css')
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
  gulp.watch(cssFiles, ['docs']);
});

// Default
gulp.task('default', ['css']);

// Development
gulp.task('dev', ['docs', 'serve']);
