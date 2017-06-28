// require
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var debug = require('gulp-debug');
var nano = require('gulp-cssnano');
var ts = require("gulp-typescript");
var merge = require('merge2');
var inject = require('gulp-inject');


// SASS
var input_sass = 'src/sass/**/*.scss';
var output_sass = 'web/css/';

var sassOptions = {
    errLogToConsole: true
    // outputStyle: 'expanded'
};


// Autoprefixer Optionen
var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};


// Typescript
var input_ts = 'src/ts/**/*.ts';
var output_ts = 'web/js';
var output_tsd = 'web/definitions';

var tsProject = ts.createProject("tsconfig.json");

gulp.task('nw-typescript', function () {
    var tsResult = gulp.src(input_ts)
        .pipe(sourcemaps.init()) // This means sourcemaps will be generated 
        .pipe(tsProject());

    return merge([ // Merge the two output streams, so this task is finished when the IO of both operations is done.
        tsResult.dts.pipe(gulp.dest(output_tsd)),
        tsResult.js.pipe(gulp.dest(output_ts))
    ]);
});


// CSS
gulp.task('nw-css', function () {
    return gulp.src(input_sass)
        .pipe(debug({title: 'nw-css:'}))
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(nano())
        .pipe(sourcemaps.write('./maps'))
        //  .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(output_sass));
});


// HTML

var watch_html = 'src/html/**/*.html';
var input_html = 'src/html/views/**/*.html';
var output_html = './web';

gulp.task('html-inject', function () {

    // MAIN
gulp.src('./src/html/index.html')
    .pipe(inject(gulp.src([input_html]), {
        starttag: '<!-- inject:{{path}} -->',
        relative: true,
        transform: function (filePath, file) {
            // return file contents as string
            return file.contents.toString('utf8')
        }
    }))
    .pipe(gulp.dest(output_html));

// REMOTE
gulp.src('./src/html/remote.html')
    .pipe(inject(gulp.src([input_html]), {
        starttag: '<!-- inject:{{path}} -->',
        relative: true,
        transform: function (filePath, file) {
            // return file contents as string
            return file.contents.toString('utf8')
        }
    }))
    .pipe(gulp.dest('./web'));
});


// Watch task
gulp.task('default', function () {
    gulp.watch(input_sass, ['nw-css']);
    gulp.watch(input_ts, ['nw-typescript']);
    gulp.watch(watch_html, ['html-inject']);

});