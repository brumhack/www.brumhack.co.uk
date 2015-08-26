var gulp = require('gulp'),
    inline = require('gulp-inline'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    minifyHTML = require('gulp-minify-html'),
    autoprefixer = require('gulp-autoprefixer'),
    chain = require('gulp-chain');

var cssChain = chain(function(stream) {
  return stream
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(minifyCSS());
});

gulp.task('default', function () {
  gulp.src('src/index.html')
    .pipe(inline({
      base: 'src/',
      js: uglify(),
      css: cssChain(),
      disabledTypes: ['svg', 'img', 'js'] // Only inline css files
    }))
    .pipe(minifyHTML())
    .pipe(gulp.dest('public/'));

  gulp.src('src/fonts/*')
    .pipe(gulp.dest('public/fonts/'));

  gulp.src('src/img/*')
    .pipe(gulp.dest('public/img/'));

  gulp.src('src/logo-*')
    .pipe(gulp.dest('public/'));

  gulp.src('src/favicon.ico')
    .pipe(gulp.dest('public/'));
});

gulp.task('watch', function() {
  return gulp.watch('src/**/*', ['default']);
});
