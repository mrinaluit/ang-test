var gulp = require('gulp');

// Requires the gulp-sass plugin
var sass = require('gulp-sass');

//Requires the gulp-concat plugin
var concat = require('gulp-concat');

var browserSync = require('browser-sync').create();



//sass compilations
gulp.task('sass',function(){
	
    return gulp.src(['app/scss/header.scss','app/scss/footer.scss'])

    .pipe(sass()) // Converts Sass to CSS with gulp-sass

    .pipe(concat('style.css'))

    .pipe(gulp.dest('app/css/'))

    .pipe(browserSync.reload({
      stream: true
    }));

});



//browserSync 
gulp.task('browserSync', function() {
  browserSync.init({
     server: {
       baseDir: 'app'
    },
  })
});


//Watchers
gulp.task('watch',['browserSync', 'sass'], function(){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  // Other watchers
  gulp.watch('app/**/*.html', browserSync.reload);
  gulp.watch('app/*.js', browserSync.reload); 
 
});








