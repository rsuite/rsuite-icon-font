const gulp = require('gulp');
const iconfont = require('gulp-iconfont');
const consolidate = require('gulp-consolidate')
const timestamp = Math.round(Date.now() / 1000);
const fontName = 'RSuiteIconFont';
const className = 'icon';
const rename = require('gulp-rename')

gulp.task('default', function () {
    gulp.src(['src/**/*.svg'])
        .pipe(iconfont({
            fontName, // required
            prependUnicode: true, // recommended option
            formats: ['ttf', 'eot', 'woff', 'svg'],
            timestamp, // recommended to get consistent builds when watching files
        }))
        .on('glyphs', function (glyphs) {
            const options = {
                className,
                fontName,
                fontPath: 'fonts/', // set path to font (from your CSS file if relative)
                glyphs: glyphs.map(mapGlyphs)
            };

            gulp.src('src/css.tpl')
                .pipe(consolidate('lodash', options))
                .pipe(rename({ basename: fontName, extname: ".css" }))
                .pipe(gulp.dest('dist/'));

            gulp.src(`src/html.tpl`)
                .pipe(consolidate('lodash', options))
                .pipe(rename({ basename: 'index', extname: ".html" }))
                .pipe(gulp.dest('dist/'));
        })
        .pipe(gulp.dest('dist/fonts/'));
});


/**
 * This is needed for mapping glyphs and codepoints.
 */
function mapGlyphs(glyph) {
    return { name: glyph.name, codepoint: glyph.unicode[0].charCodeAt(0) }
}