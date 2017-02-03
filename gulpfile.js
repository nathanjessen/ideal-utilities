const siteRoot = 'docs';
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

// CSS
gulp.task('css', function () {
  var processors = [
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
    }),
    mdcss({
      destination: siteRoot
    })
  ];

  return gulp.src('index.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(siteRoot))
    .pipe(cssnano())
    .pipe(size())
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest(siteRoot));
});

// BrowserSync
gulp.task('serve', () => {
  browserSync.init({
    files: [siteRoot + '/**'],
    port: 4000,
    server: {
      baseDir: siteRoot
    }
  });

  // Watch
  gulp.watch(cssFiles, ['css']);
});

// Default
gulp.task('default', ['css', 'serve']);
