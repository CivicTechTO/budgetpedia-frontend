// gulpfile.js
var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var glob = require('glob');
// var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var browserSync = require('browser-sync').create();

var babelify = require("babelify");
var b = watchify(browserify({
  // entries: ['./js/testtsx.js'],
  entries:glob.sync('./js/*.js',{}),
  // cache: {},
  // packageCache: {},
  output:'bundle.js'
  // delay: 100
  }).transform(babelify, {presets: ["es2015", "react"]}),{
  ignoreWatch: ['**/node_modules/**'],
  poll: 100
}); 

// add transformations here
// i.e. b.transform(coffeeify);

gulp.task('js', bundle); // so you can run `gulp js` to build the file
gulp.task('default', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal
// browserSync.init({
//   server: "./"
// });  // gutil.log.bind(gutil, 'running');
function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    // .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    //    // Add transformation tasks to the pipeline here.
    // .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist'));
    // .pipe(browserSync.stream({once: true}));
}
