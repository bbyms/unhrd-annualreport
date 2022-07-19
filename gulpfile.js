var gulp = require("gulp"),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    ejs = require("gulp-ejs"),
    watch = require("gulp-watch"),
    postcss = require('gulp-postcss'),
    rename = require('gulp-rename'),
    gulpCopy = require('gulp-copy'),
    autoprefixer = require('autoprefixer'),
    browserSync = require('browser-sync').create();

    // browsersync sass and templates change
    gulp.task('serve', function() {

        browserSync.init({
          server: "dist/"
        });

        gulp.watch('assets/scss/**/*.scss', gulp.series('sass'));
        gulp.watch('assets/templates/**/*.ejs', gulp.series('templates'));
        gulp.watch('dist/css/styles.css').on('change', browserSync.reload);
        gulp.watch('dist/*.html').on('change', browserSync.reload);
    });

    // sass compilation
    gulp.task('sass', function () {
       return gulp.src('assets/scss/**/*.scss')
          .pipe(sass())
          .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
          .pipe(gulp.dest('./dist/css'))
          .pipe(browserSync.stream());
    });

    // minify css
    gulp.task('minify-css', function() {
      return gulp.src('dist/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css/'));
    });

    // compile ejs templates
    gulp.task('templates', function () {
       return gulp.src('assets/templates/*.ejs')
         .pipe(ejs({}))
         .pipe(rename({ extname: '.html' }))
         .pipe(gulp.dest('./dist'))
         .pipe(browserSync.stream());
    });

    // watch sass and templates
    gulp.task('watch', function() {
        gulp.watch(['assets/scss/**/*.scss'] , ['sass']);
        gulp.watch('assets/templates/*.ejs' , ['templates']);
    });

    gulp.task('default', gulp.series('serve'));
