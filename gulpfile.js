const fs = require('fs');
const gulp = require('gulp');
const iconfont = require('gulp-iconfont');
const consolidate = require('gulp-consolidate');
const { fontName, className, svgSrc } = JSON.parse(fs.readFileSync(__dirname + '/package.json', 'utf8')).CONFIG;
const timestamp = Math.round(Date.now() / 1000);
const rename = require('gulp-rename');

gulp.task('default', function() {
  gulp.src(svgSrc)
    .pipe(iconfont({
      fontName, // required
      prependUnicode: true, // recommended option
      formats: ['ttf', 'eot', 'woff', 'svg'],
      timestamp, // recommended to get consistent builds when watching files
      descent: 180,
      fontHeight: 1000,
      normalize: true
    }))
    .on('glyphs', function(glyphs) {
      const options = {
        className,
        fontName,
        fontPath: 'fonts/', // set path to font (from your CSS file if relative)
        glyphs: glyphs.sort((a, b) => {
          return a.name.localeCompare(b.name);
        }).map(mapGlyphs)
      };

      gulp.src('src/tpl/css.tpl')
        .pipe(consolidate('lodash', options))
        .pipe(rename({
          basename: fontName,
          extname: '.css'
        }))
        .pipe(gulp.dest('dist/'));

      gulp.src('src/tpl/less.tpl')
        .pipe(consolidate('lodash', options))
        .pipe(rename({
          basename: 'iconfont',
          extname: '.less'
        }))
        .pipe(gulp.dest('dist/'));

      gulp.src('src/tpl/variables.tpl')
        .pipe(consolidate('lodash', options))
        .pipe(rename({
          basename: 'iconfont-variables',
          extname: '.less'
        }))
        .pipe(gulp.dest('dist/'));

      gulp.src(`src/tpl/html.tpl`)
        .pipe(consolidate('lodash', options))
        .pipe(rename({
          basename: 'index',
          extname: '.html'
        }))
        .pipe(gulp.dest('dist/'));

      gulp.src(`src/tpl/json.tpl`)
        .pipe(consolidate('lodash', options))
        .pipe(rename({
          basename: 'icons',
          extname: '.json'
        }))
        .pipe(gulp.dest('dist/'));
    })
    .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('prepublish', () => {
  gulp.src(svgSrc)
    .pipe(rename(path => {
      path.basename = path.basename.replace(/^.*-/, '');
    }))
    .pipe(gulp.dest('./icons'));
});


/**
 * This is needed for mapping glyphs and codepoints.
 */
function mapGlyphs(glyph) {
  return {
    name: glyph.name,
    codepoint: glyph.unicode[0].charCodeAt(0)
  }
}
