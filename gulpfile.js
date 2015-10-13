var gulp = require('gulp');

var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var clean = require('gulp-clean');

var fs = require('fs');
var header  = require('gulp-header');


var getCopyright = function(){
  return fs.readFileSync('./copyright.js');
};




gulp.task('slider_clean',function(){
  return gulp.src(['./dist/slider.min.js'],{read:false})
        .pipe(clean({force:true}));
});

gulp.task('slider_js',['slider_clean'],function(){
  return gulp.src(['./js/slider.js'])
        .pipe(rename({suffix:'.min'}))
        .pipe(uglify())
        .pipe(header(getCopyright()))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default',['slider_js']);