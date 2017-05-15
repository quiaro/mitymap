const gulp = require('gulp');
const browserify = require('browserify');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');
const stringify = require('stringify');

gulp.task('build', [
  'copy-static',
  'bundle-materialize-css',
  'bundle-materialize-js',
  'styles',
  'lint',
  'scripts']);

gulp.task('default', ['build'], function defaultTask() {
    gulp.watch('src/**/*.scss').on('change', function() {
      gulp.start('styles');
      browserSync.reload();
    });

    gulp.watch('src/**/*.html').on('change', function() {
      gulp.start('scripts');
      browserSync.reload();
    });

    gulp.watch('src/**/*.js').on('change', function() {
      gulp.start('lint');
      gulp.start('scripts');
      browserSync.reload();
    });

    gulp.watch(['./index.html']).on('change', function() {
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
      '*lib/js/*.js'
  ]).pipe(gulp.dest('dist'));
});

gulp.task('lint', function lintTask() {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
  return gulp.src(['src/**/*.js', '!node_modules/**'])
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
  gulp.src(['lib/materialize-0.98.2/sass/materialize.scss',
            'lib/materialize-0.98.2/extras/nouislider.css'])
      .pipe(sass().on('error', sass.logError))
      .pipe(concat('materialize.css'))
      .pipe(cleanCSS())
      .pipe(gulp.dest('dist/lib/materialize'))
})

gulp.task('bundle-materialize-js', function bundleMaterializeTask() {
  gulp.src(['lib/materialize-0.98.2/js/*.js',
            'lib/materialize-0.98.2/extras/nouislider.js'])
      .pipe(concat('materialize.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/lib/materialize'))
})

gulp.task('scripts', function scriptsTask() {

  var b = browserify({
    entries: './src/app.js',
    debug: true
  }).transform('babelify', { presets: ['es2015'] })
    .transform(stringify(['.html']));

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('styles', function stylesTask() {
  gulp.src('src/sass/app.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.stream());
});
