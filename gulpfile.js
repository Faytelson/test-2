const gulp = require('gulp'),
    {series, parallel, src, watch, dest} = require('gulp'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify-es').default,
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    compimg = require('compress-images'),
    pathJS = 'app/js/**/*.js',
    pathCSS = 'app/**/*.scss',
    pathIMG = 'app/images/src/**/*';

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/',
        },
        online: true,
        notify: false,
    })
}

function scripts() {
    return src([pathJS, '!app/js/**/*.min.js'])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js/'))
        .pipe(browserSync.stream())
}

function styles() {
    return src(pathCSS)
        .pipe(sass())
        .pipe(concat('app.min.css'))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(dest('app/css/'))
        .pipe(browserSync.stream())
}

async function images() {
    compimg(
        pathIMG,
        'app/images/dest/',
        {
            compress_force: false,
            statictic: true,
            autoupdate: true,
        },
        false,
        { 
            jpg: { 
                engine: "mozjpeg", 
                command: ["-quality", "75"] 
            } 
        }, 
		{ 
            png: { 
                engine: "pngquant", 
                command: ["--quality=75-100", "-o"] 
            } 
        },
		{ 
            svg: { 
                engine: "svgo", 
                command: "--multipass" 
            } 
        },
		{ 
            gif: { 
                engine: "gifsicle", 
                command: ["--colors", "64", "--use-col=web"] 
            } 
        },
        function(err, completed) {
            if(completed === true) {
                browserSync.reload();
            }
        }
    )
}

function watcher() {
    watch([pathJS, '!app/js/**/*.min.js'], scripts);
    watch(pathCSS, styles);
    watch('app/**/*.html').on('change', browserSync.reload);
    watch(pathIMG, images);
}

function buildCopy() {
    return src([
        'app/js/**/*.min.js',
        'app/css/**/*.min.css',
        'app/images/dest/**/*',
        'app/**/*.html',
        'app/json/**/*'
    ], {
        base: 'app'
    })
    .pipe(dest('dist'))
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.default = parallel(scripts, images, styles, browsersync, watcher);
exports.build = series(styles, scripts, images, buildCopy);