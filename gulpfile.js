var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var runSequence = require('run-sequence');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var pump = require('pump');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');


//Variaveis

// scss
var scssFiles = './src/styles/**/*.scss';

// CSS
var cssDest = 'build/css';

// Js
var jsFiles = './src/js/*.js';

// Pug 
var pugFiles = './src/pug/*.pug';

// HTML
var htmlDest = 'build/template';

var sassProd = {
  outputStyle: 'compressed'
}


// Tasks

// pug
gulp.task ('gulppug', function(){
  return gulp.src(pugFiles)
  .pipe(pug({pretty: true}))
  .pipe( gulp.dest(htmlDest));
});

// sassprod
gulp.task('sassprod', function() {
  return gulp.src('./src/styles/style.scss')
    .pipe(sass(sassProd).on('error', sass.logError))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(cssDest));
});
	
// compress
gulp.task('compress', function (cb) {
  pump([
        gulp.src(jsFiles),
        uglify(),
        gulp.dest('build/js')
    ],
    cb
  );
});

// Clean
gulp.task('clean', () => del(['build']));

//imagemin
gulp.task('imagemin', function() {
  imagemin(['./src/img/*.{jpg,png}'], 'build/img', {
      plugins: [
          imageminJpegtran(),
          imageminPngquant({quality: '65-80'})
      ]
  }).then(files => {
      console.log(files);
      //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …] 
  });
}); 

// watch
gulp.task('watch', function() {
  gulp.watch(scssFiles, ['sassprod']);
  gulp.watch(pugFiles, ['gulppug']);
  gulp.watch(jsFiles, ['compress']);  
  gulp.watch(pugFiles, ['imagemin']);
});

// Gulp task
gulp.task('default', ['clean'], function () {
  runSequence(
    'gulppug',
    'sassprod',
    'compress',
    'watch',
    'imagemin'
  );
});