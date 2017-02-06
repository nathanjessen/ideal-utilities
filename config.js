module.exports = {
  browsersync: {
    files: ['./dist/docs/**'],
    source: './dist/docs',
    destination: [
      '**/*.scss',
      '!bower_components/**/*.scss',
      '!node_modules/**/*.scss'
    ]
  },
  documentation: {
    source: [
      './dist/index.css'
    ],
    destination: './dist/docs'
  },
  sass_lint: {
    source: [
      '**/*.scss',
      '!bower_components/**/*.scss',
      '!node_modules/**/*.scss'
    ]
  },
  sass_development: {
    source: [
      '**/*.scss',
      '!**/_*.scss',
      '!bower_components/**/*.scss',
      '!node_modules/**/*.scss'
    ],
    destination: './dist'
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
}
