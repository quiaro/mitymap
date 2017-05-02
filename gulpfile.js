const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');

gulp.task('default', [
  'copy-static',
  'bundle-materialize-css',
  'bundle-materialize-js',
  'styles',
  'lint',
  'scripts'], function defaultTask() {
    gulp.watch('src/sass/**/*.scss', ['styles']);

    gulp.watch('src/js/**/*.js').on('change', function() {
      gulp.start('lint');
      gulp.start('scripts');
      browserSync.reload();
    });

    gulp.watch(['./index.html', 'src/css/**/*.css']).on('change', function() {
      gulp.start('copy-static');
      browserSync.reload();
    });

    browserSync.init({
      server: './dist'
    });
  });

gulp.task('copy-static', function() {
  return gulp.src([
      'index.html',
      'src/favicon/*.*',
      'src/*css/**/*.css',
      'src/*vendor/js/*.js'
  ]).pipe(gulp.dest('dist'));
});

gulp.task('lint', function lintTask() {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
  return gulp.src(['src/js/**/*.js', '!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

gulp.task('bundle-materialize-css', function bundleMaterializeTask() {
  gulp.src('src/vendor/materialize-0.98.2/sass/materialize.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(cleanCSS())
      .pipe(gulp.dest('dist/vendor/materialize'))
})

gulp.task('bundle-materialize-js', function bundleMaterializeTask() {
  gulp.src('src/vendor/materialize-0.98.2/js/*.js')
      .pipe(concat('materialize.js'))
      // .pipe(uglify())
      .pipe(gulp.dest('dist/vendor/materialize'))
})

gulp.task('scripts', function scriptsTask() {

  var b = browserify({
    entries: './src/js/main.js',
    debug: true
  }).transform('babelify', { presets: ['es2015'] });

  return b.bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('styles', function stylesTask() {
  gulp.src('src/sass/**/main.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.stream());
});
