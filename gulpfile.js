// Load all required packages
const gulp   = require('gulp')
const sass   = require('gulp-sass')
const prefix = require('gulp-autoprefixer')
const minify = require('gulp-minify-css')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const coffee = require('gulp-coffee')
const sync   = require('browser-sync').create()

// Compile sass
gulp.task('sass:min', function() {
  gulp.src('./src/sass/style.sass')
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(prefix(
      'last 1 version', '> 1%', 'ie8', 'ie7'
    ))
    .pipe(minify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/css'))
})

// Compile coffee
gulp.task('coffee:min', function() {
  gulp.src('./src/coffee/*.coffee')
    .pipe(coffee({bare: true}))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/js'))
})

// Watch for changes
gulp.task('watch', function() {
  gulp.watch('./src/sass/*.sass', [ 'sass:min' ])
  gulp.watch('./src/coffee/*.coffee', [ 'coffee:min' ])
})

// Serve task
gulp.task('serve', ['watch'], function() {
  sync.init({
    server: './dist'
  })

  gulp.watch('./dist/**').on('change', sync.reload)
})
