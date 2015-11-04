var del = require('del');
var gulp = require('gulp');
var sass = require('gulp-sass');

var paths = {
    html: './src/html/',
    scss: './src/scss/',
    img: './src/img/',
    dist: './dist/'
};

// Event listener for a given watch instance
function addWatcherListener(watcher) {
    watcher.on('change', function(event) {
        console.log('Updated!: ' + event.path);
    });
}

// Clean task
gulp.task('clean', function() {
    del(paths.dist);
});

// Copy task(s)
gulp.task('copy:html', function() {
    return gulp.src(paths.html + '**/*.html').pipe(gulp.dest(paths.dist + 'html/'));
});
gulp.task('copy:img', function() {
    return gulp.src(paths.img + '**/*').pipe(gulp.dest(paths.dist + 'img/'));
});

// Sass
gulp.task('sass', function() {
    gulp.src(paths.scss + '**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.dist + 'css'));
});

// Watch task(s)
gulp.task('html:watch', function() {
    var watcher = gulp.watch(paths.html + '**/*.html', ['copy:html']);
    addWatcherListener(watcher);
});

gulp.task('scss:watch', function() {
    var watcher = gulp.watch(paths.scss + '**/*.scss', ['sass']);
    addWatcherListener(watcher);
});

gulp.task('default', ['clean', 'copy:html', 'copy:img', 'sass', 'html:watch', 'scss:watch']);
