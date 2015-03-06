var gulp            = require('gulp'),
    // this is an arbitrary object that loads all gulp plugins in package.json. 
    $           = require("gulp-load-plugins")(),
    path        = require('path'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
    affected    = require('gulp-jade-find-affected'),
    sass        = require('gulp-sass');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./dist"
    }
  });
});

gulp.task('compass', function() {
    return gulp.src('./src/stylesheets/*.scss')
        .pipe($.plumber())
        .pipe($.compass({
            css: 'dist/stylesheets',
            sass: 'src/stylesheets'
        }))
        .pipe(gulp.dest('dist/stylesheets'))
});

gulp.task('js', function() {
  return gulp.src('src/scripts/*.js')
    .pipe( $.concat('app.js') )
    .pipe( $.uglify() )
    .pipe( gulp.dest('dist/scripts/'));
});

gulp.task('images', function() {
  return gulp.src('./src/images/*')
    .pipe(gulp.dest('./dist/images'))
})

gulp.task('templates', function() {
  return gulp.src('src/*.jade')
    .pipe($.plumber())
    .pipe( affected() )
    .pipe($.jade({
      pretty: true
    }))
    .pipe( gulp.dest('dist/') )
});

gulp.task('default',['compass','js','templates','browser-sync'], function () {
  
  gulp.watch('src/stylesheets/*.scss',['compass', reload]);

  gulp.watch('src/scripts/*.js',['js', reload]);
  
  gulp.watch('src/images/**/*',['images', reload]);

  gulp.watch('src/*.jade',['templates', reload]);
    
});


