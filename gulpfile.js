var $ = require('gulp-load-plugins')();
var argv = require('yargs').argv;
var browser = require('browser-sync');
var gulp = require('gulp');
var rimraf = require('rimraf');
var sequence = require('run-sequence');
var sherpa = require('style-sherpa');
var webpack = require('webpack');
var minifyHTML = require('gulp-minify-html');

// Check for --production flag
var isProduction = !!(argv.production);

// Port to use for the development server.
var PORT = 8000;

// Browsers to target when prefixing CSS.
var COMPATIBILITY = ['last 2 versions', 'ie >= 9'];

// File paths to various assets are defined here.
var PATHS = {
    assets: [
        'src/assets/**/*',
        '!src/assets/{!img,js,scss,vendor}/*'
    ],
    sass: [

    ]
};

// Delete the "dist" folder
// This happens every time a build starts
gulp.task('clean', function(done) {
    rimraf('dist', done);
});

// Copy files out of the assets folder
// This task skips over the "img", "js", and "scss" folders, which are parsed separately
gulp.task('copy', function() {
    gulp.src(PATHS.assets)
        .pipe(gulp.dest('dist/assets'));
});

// Copy page templates into finished HTML files
gulp.task('pages', function() {
    gulp.src('src/pages/**/*.{html,hbs,handlebars}')
        .pipe($.if(!isProduction, $.minifyHTML({
            empty: true
        })))
        .pipe(gulp.dest('dist'));
});

gulp.task('pages:reset', function(cb) {
    panini.refresh();
    gulp.run('pages');
    cb();
});

gulp.task('styleguide', function(cb) {
    sherpa('src/styleguide/index.md', {
        output: 'dist/styleguide.html',
        template: 'src/styleguide/template.html'
    }, cb);
});

// Compile Sass into CSS
// In production, the CSS is compressed
gulp.task('sass', function() {
    var uncss = $.if(isProduction, $.uncss({
        html: ['src/**/*.html'],
        ignore: [
            new RegExp('^meta\..*'),
            new RegExp('^\.is-.*')
        ]
    }));
    var minifycss = $.if(isProduction, $.minifyCss());

    return gulp.src('src/assets/scss/app.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass({
                includePaths: PATHS.sass
            })
            .on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: COMPATIBILITY
        }))
        .pipe(uncss)
        .pipe(minifycss)
        .pipe($.if(!isProduction, $.sourcemaps.write()))
        .pipe(gulp.dest('dist/assets/css'));
});

// Combine JavaScript into one file
// In production, the file is minified
gulp.task('javascript', function() {
    var config = Object.create(require("./webpack.config.js"));
    webpack(config, function(err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        delete require.cache[require.resolve('./webpack.config.js')]; //because we usually change this file
    });
});

// Copy images to the "dist" folder
// In production, the images are compressed
gulp.task('images', function() {
    var imagemin = $.if(isProduction, $.imagemin({
        progressive: true
    }));

    return gulp.src('src/assets/img/**/*')
        .pipe(imagemin)
        .pipe(gulp.dest('dist/assets/img'));
});

// Build the "dist" folder by running all of the above tasks
gulp.task('build', function(done) {
    sequence('clean', ['pages', 'sass', 'javascript', 'images', 'copy'], 'styleguide', done);
});

// Start a server with LiveReload to preview the site in
gulp.task('server', ['build'], function() {
    browser.init({
        server: 'dist',
        port: PORT
    });
});

// Build the site, run the server, and watch for file changes
gulp.task('default', ['build', 'server'], function() {
    gulp.watch(PATHS.assets, ['copy', browser.reload]);
    gulp.watch(['src/pages/**/*.html'], ['pages', browser.reload]);
    gulp.watch(['src/{layouts,partials}/**/*.html'], ['pages:reset', browser.reload]);
    gulp.watch(['src/assets/scss/**/*.scss'], ['sass', browser.reload]);
    gulp.watch(['src/assets/js/**/*.js'], ['javascript', browser.reload]);
    gulp.watch(['src/assets/img/**/*'], ['images', browser.reload]);
    gulp.watch(['src/styleguide/**'], ['styleguide', browser.reload]);

    gulp.watch(['webpack.config.js'], ['build', browser.reload]);
});
