let { src, dest, watch, parallel, series } = require('gulp');
let scss         = require('gulp-sass');
let concat       = require('gulp-concat');
let browser_sync = require('browser-sync').create();
let uglify       = require('gulp-uglify-es').default;
let autoprefixer = require('gulp-autoprefixer');
let imagemin     = require('gulp-imagemin');
let del          = require('del');

function clean() {
  return del('dist')
}

function styles() {
  return src('app/scss/**/*.scss')
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version'],
      grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browser_sync.stream())
}

function scripts() {
  return src([
    'app/js/script.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browser_sync.stream())

}

function img() {
  return src('app/img/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(dest('dist/img'))
}

function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/*.html']).on('change', browser_sync.reload);
  watch(['app/js/*.js', '!app/js/main.min.js'], scripts)
}

function browsersync() {
  browser_sync.init({
    server: {
      baseDir: 'app/'
    }
  });
}

function build() {
  return src([
    'app/css/style.min.css',
    'app/fonts/**/*',
    'app/js/main.min.js',
    'app/*.html',
    'app/img/'
  ], { base: 'app' })
    .pipe(dest('dist'))
}


exports.styles = styles;
exports.scripts = scripts;
exports.img = img;
exports.watching = watching;
exports.browsersync = browsersync;
exports.clean = clean;

exports.build = series(clean, img, build);
exports.default = parallel(styles, scripts, browsersync, watching);