var gulp = require('gulp'),
  browserSync = require('browser-sync').create('first'),
  buffer = require('vinyl-buffer'),
  changed = require('gulp-changed'),
  del = require('del'),
  importify = require('gulp-importify'),
  prettify = require('gulp-jsbeautifier'),
  gcmq = require('gulp-group-css-media-queries'),
  imagemin = require('gulp-imagemin'),
  pug = require('gulp-pug'),
  plumber = require('gulp-plumber'),
  runSequence = require('run-sequence'),
  rename = require('gulp-rename'),
  replace = require('gulp-replace'),
  gutil = require('gulp-util'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  csscomb = require('gulp-csscomb'),
  csso = require('gulp-csso'),
  watch = require('gulp-watch'),
  svgSprite = require('gulp-svg-sprite'),
  cheerio = require('gulp-cheerio'),
  source = require('vinyl-source-stream'),
  browserify = require('browserify'),
  babelify = require('babelify');

var workPath = {
  build: {
    pages: './docs/',
    css: './docs/css/',
    js: './docs/js/',
    images: './docs/img/',
    icons: './docs/img/',
    fonts: './docs/fonts/',
    rootFiles: './docs/'
  },
  src: {
    pages: './src/views/pages/**/*.pug',
    styles: ['./src/styles/scss/variables.scss', './src/styles/scss/reset.scss', './src/styles/scss/fonts.scss', './src/styles/css/**/*.css', './src/styles/scss/**/*.scss', './src/blocks/**/*.scss'],
    jsApp: './src/scripts/app.js',
    js: './src/blocks/**/*.js',
    otherScripts: './src/scripts/vendor/**/*.js',
    images: ['./src/images/**/*.{png,jpg,jpeg,gif,svg}', './src/blocks/**/*.{png,jpg,jpeg,gif,svg}', '!./src/blocks/icon/**/*.svg'],
    icons: './src/blocks/icon/sprite/*.svg',
    fonts: './src/fonts/**/*.*',
    rootFiles: './src/rootFiles/*.*'
  },
  watch: {
    layouts: './src/views/layouts/*.pug',
    blocks: './src/blocks/**/*.pug',
    pages: './src/views/pages/*.pug',
    styles: ['./src/styles/scss/**/*.scss', './src/styles/scss/reset.scss', './src/styles/scss/fonts.scss', './src/styles/css/**/*.css', './src/blocks/**/*.scss'],
    js: ['./src/scripts/*.js', './src/blocks/**/*.js'],
    images: ['./src/images/**/*.{png,jpg,jpeg,gif,svg}', './src/blocks/**/*.{png,jpg,jpeg,gif,svg}'],
    icons: './src/blocks/icon/**/*.svg',
    fonts: './src/fonts/**/*.*',
    rootFiles: './src/rootFiles/*.*'
  }
};

var env = gutil.env.env || 'development';

gulp.task('pages:build', function () {
  return gulp.src(workPath.src.pages)
    .pipe(plumber())
    .pipe(pug())
    .pipe(prettify({
      'indent_size': 2,
      'indent_char': ' '
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(workPath.build.pages))
    .pipe(browserSync.stream());
});

gulp.task('styles:build', function () {
  return gulp.src(workPath.src.styles, {base: process.cwd()})
    .pipe(plumber())
    .pipe(importify('styles.scss', {
      cssPreproc: 'scss'
    }))
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie >= 11'],
      cascade: false
    }))
    .pipe(csscomb())
    .pipe(csso())
    .pipe(gcmq())
    .pipe(env === 'production' ? csso() : gutil.noop())
    .pipe(plumber.stop())
    .pipe(gulp.dest(workPath.build.css))
    .pipe(browserSync.stream());
});

gulp.task('scripts:build', function (done) {
  return browserify({
    entries: [workPath.src.jsApp],
    debug: false
  })
    .transform(babelify, {presets: ['es2015'], sourceMaps: false})
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(env === 'production' ? uglify() : gutil.noop())
    .pipe(gulp.dest(workPath.build.js))
    .pipe(browserSync.stream());
});

gulp.task('images:build', function () {
  return gulp.src(workPath.src.images)
    .pipe(plumber())
    .pipe(changed(workPath.build.images))
    .pipe(imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(workPath.build.images));
});

var svg = {
  mode: {
    symbol: {
      dest: '',
      sprite: 'icons.svg'
    }
  },
  svg: {
    xmlDeclaration: false,
    doctypeDeclaration: false,
    namespaceIDs: false,
    dimensionAttributes: false
  }
};

gulp.task('icons:build', function () {
  return gulp.src(workPath.src.icons)
    .pipe(cheerio({
      run: function ($) {
        $('[stroke]').removeAttr('stroke');
        $('[fill]').removeAttr('fill');
        $('[style]').removeAttr('style');
      },
      parserOptions: {xmlMode: true}
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(rename({prefix: 'icon-'}))
    .pipe(svgSprite(svg))
    .pipe(gulp.dest(workPath.build.icons));
});

gulp.task('fonts:build', function () {
  return gulp.src(workPath.src.fonts)
    .pipe(gulp.dest(workPath.build.fonts));
});

gulp.task('rootFiles:build', function () {
  return gulp.src(workPath.src.rootFiles)
    .pipe(plumber())
    .pipe(gulp.dest(workPath.build.rootFiles));
});

var server = {
  server: {
    baseDir: './docs/'
  },
  tunnel: false,
  host: 'localhost',
  port: 5000,
  ui: {
    port: 5001
  }
};

gulp.task('connect', function () {
  browserSync.init(server);
});

gulp.task('clean', function (cb) {
  return del('./docs', cb);
});

gulp.task('build', function (cb) {
  runSequence(
    ['pages:build', 'styles:build', 'scripts:build', 'images:build', 'icons:build', 'fonts:build', 'rootFiles:build'],
    cb
  )
});

gulp.task('watch', function () {
  watch([workPath.watch.layouts, workPath.watch.pages, workPath.watch.blocks], function (event, cb) {
    gulp.start('pages:build');
  });
  watch(workPath.watch.styles, function (event, cb) {
    gulp.start('styles:build');
  });
  watch(workPath.watch.js, function (event, cb) {
    gulp.start('scripts:build');
  });
  watch(workPath.watch.images, function (event, cb) {
    gulp.start('images:build');
  });
  watch([workPath.watch.icons], function (event, cb) {
    gulp.start('icons:build');
  });
  watch([workPath.watch.fonts], function (event, cb) {
    gulp.start('fonts:build');
  });
  watch(workPath.watch.rootFiles, function (event, cb) {
    gulp.start('rootFiles:build');
  });
});

gulp.task('default', function (cb) {
  runSequence(
    'clean',
    'build',
    'connect',
    'watch',
    cb
  )
});
