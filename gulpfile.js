var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var sass        = require('gulp-sass');
var jshint      = require('gulp-jshint');
var concatJs    = require('gulp-concat');
var notify      = require("gulp-notify");
var uglify      = require('gulp-uglify');
var spritesmith = require('gulp.spritesmith');
var jsOut       = 'src/js/*.js';
// favicon
var realFavicon = require ('gulp-real-favicon');
var fs = require('fs');
var FAVICON_DATA_FILE = 'faviconData.json';
var imageop = require('gulp-image-optimization');
var concat   = require('gulp-concat');
var font2css = require('gulp-font2css').default;
// image
//var tinypng = require('gulp-tinypng-compress');

/*gulp.task('tinypng', function () {
  gulp.src('src/teste-images/*.{png,jpg,jpeg}')
    .pipe(tinypng({
      key: 'eyqUqYnpYedausdZE5ocUUKQtbQCadRt',
      sigFile: 'com-tiny/.tinypng-sigs',
      log: true
    }))
    .pipe(gulp.dest('com-tiny'));
});*/

gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*.{otf,ttf,woff,woff2}')
    .pipe(font2css())
    .pipe(concat('fonts.css'))
    .pipe(gulp.dest('src/sass/includes'))
})

gulp.task('images', function(cb) {
    gulp.src(['src/teste-images/*.png','src/teste-images/*.jpg','src/teste-images/*.gif','src/teste-images/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('sem-tiny')).on('end', cb).on('error', cb);
});

// start favicon
gulp.task('generate-favicon', function(done) {
  realFavicon.generateFavicon({
    masterPicture: 'src/favicon/logo.png',
    dest: 'favicon/images',
    iconsPath: 'http://192.168.1.36/sites/natal2017/favicon/images',
    design: {
      ios: {
        pictureAspect: 'backgroundAndMargin',
        backgroundColor: '#ffffff',
        margin: '14%',
        assets: {
          ios6AndPriorIcons: false,
          ios7AndLaterIcons: false,
          precomposedIcons: false,
          declareOnlyDefaultIcon: true
        }
      },
      desktopBrowser: {},
      windows: {
        pictureAspect: 'noChange',
        backgroundColor: '#ffffff',
        onConflict: 'override',
        assets: {
          windows80Ie10Tile: false,
          windows10Ie11EdgeTiles: {
            small: false,
            medium: true,
            big: false,
            rectangle: false
          }
        }
      },
      androidChrome: {
        pictureAspect: 'noChange',
        themeColor: '#ffffff',
        manifest: {
          name: 'Soma Dev',
          display: 'standalone',
          orientation: 'notSet',
          onConflict: 'override',
          declared: true
        },
        assets: {
          legacyIcon: false,
          lowResolutionIcons: false
        }
      },
      safariPinnedTab: {
        pictureAspect: 'silhouette',
        themeColor: '#5bbad5'
      }
    },
    settings: {
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false
    },
    markupFile: FAVICON_DATA_FILE
  }, function() {
    done();
  });
});


// close favicon

gulp.task('sass', function() {
    return gulp.src("src/sass/main.scss")
        .pipe( sass({
            outputStyle: 'compressed' // use 'compressed' para minificar o css
        }) )
        .on('error', sass.logError)
        .pipe(gulp.dest("build/css"))
        .pipe(browserSync.stream())
        .pipe(notify({ message: "Css gerado!", onLast: true }));
});

gulp.task('js', function() {
    gulp.src(jsOut)
        .pipe(concatJs('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
        .pipe(notify({ message: "Js gerado!", onLast: true }));
});

gulp.task('watch', function() {
    gulp.watch(["src/sass/**/**/*.scss"], ['sass']);
    gulp.watch([jsOut], ['js']).on('change', browserSync.reload);
    gulp.watch(["./**/*.php", "*.html"]).on('change', browserSync.reload);
});

gulp.task('sprite-generator', function generateSpritesheets () {
  var spriteData = gulp.src('./sprite/*.png')
    .pipe(spritesmith({
      //retinaSrcFilter: './sprite/*-2x.png',

      imgName: '../../src/images/sprite.png',
      // retinaImgName: 'sprite-2x.png',

      cssName: '_asprite.scss'
    }));

  spriteData.img.pipe(gulp.dest('./src/images'));
  spriteData.css.pipe(gulp.dest('./src/sass'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "http://192.168.1.36/sites/natal2017",
        notify: false
    });
});

gulp.task('default', ['sass', 'js', 'watch', 'browser-sync']);
gulp.task('sprite', ['gulp']);