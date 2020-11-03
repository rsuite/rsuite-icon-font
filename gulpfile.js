const fs = require('fs');
const gulp = require('gulp');
const iconfont = require('gulp-iconfont');
const consolidate = require('gulp-consolidate');
const { fontName, className, svgSrc, lessClassNamePrev } = JSON.parse(
  fs.readFileSync(__dirname + '/package.json', 'utf8')
).CONFIG;
const { mtime } = fs.statSync('./package.json');
// Use package.json edit time as timestamp;
const timestamp = +mtime;
const rename = require('gulp-rename');
const generateComponents = require('./generateReactComponent');

/**
 * This is needed for mapping glyphs and codepoints.
 */
function mapGlyphs(glyph) {
  return {
    name: glyph.name,
    codepoint: glyph.unicode[0].charCodeAt(0),
  };
}

function defaultTask() {
  return gulp
    .src(svgSrc)
    .pipe(
      iconfont({
        fontName, // required
        prependUnicode: true, // recommended option
        formats: ['ttf', 'eot', 'woff', 'svg'],
        timestamp, // recommended to get consistent builds when watching files
        descent: 143, // The same to font-awesome?v4.7.0
        fontHeight: 1000,
        normalize: true,
      })
    )
    .on('glyphs', function (glyphs) {
      const options = {
        className,
        lessClassNamePrev,
        fontName,
        fontPath: 'fonts/', // set path to font (from your CSS file if relative)
        glyphs: glyphs
          .sort((a, b) => {
            return a.name.localeCompare(b.name);
          })
          .map(mapGlyphs),
      };

      gulp
        .src('src/tpl/css.tpl')
        .pipe(consolidate('lodash', options))
        .pipe(
          rename({
            basename: fontName,
            extname: '.css',
          })
        )
        .pipe(gulp.dest('dist/'));

      gulp
        .src('src/tpl/iconfont-less.tpl')
        .pipe(consolidate('lodash', options))
        .pipe(
          rename({
            basename: 'iconfont',
            extname: '.less',
          })
        )
        .pipe(gulp.dest('dist/'));

      gulp
        .src('src/tpl/iconfont-variables-less.tpl')
        .pipe(consolidate('lodash', options))
        .pipe(
          rename({
            basename: 'iconfont-variables',
            extname: '.less',
          })
        )
        .pipe(gulp.dest('dist/'));

      gulp
        .src('src/tpl/html.tpl')
        .pipe(consolidate('lodash', options))
        .pipe(
          rename({
            basename: 'index',
            extname: '.html',
          })
        )
        .pipe(gulp.dest('dist/'));

      gulp
        .src('src/tpl/json.tpl')
        .pipe(consolidate('lodash', options))
        .pipe(
          rename({
            basename: 'icons',
            extname: '.json',
          })
        )
        .pipe(gulp.dest('dist/'));

      gulp
        .src('src/tpl/d.ts.tpl')
        .pipe(consolidate('lodash', options))
        .pipe(
          rename({
            basename: 'icons.d',
            extname: '.ts',
          })
        )
        .pipe(gulp.dest('dist/'));
    })
    .pipe(gulp.dest('dist/fonts/'));
}

function renameTask() {
  return gulp
    .src(svgSrc)
    .pipe(
      rename((path) => {
        path.basename = path.basename.replace(/^.*-/, '');
      })
    )
    .pipe(gulp.dest('./svgs'));
}

function buildToLib(cb) {
  generateComponents();
  cb();
}

exports.buildToLib = gulp.series(buildToLib);
exports.default = gulp.series(defaultTask, buildToLib);
exports.prepublish = gulp.series(defaultTask, buildToLib, renameTask);
