const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const pug = require('gulp-pug');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');

const server = browserSync.create();

const postCSSPluings = [
    cssnano({
        autoprefixer: {
            add: true
        }
    })
];

gulp.task('views', function () {
    return gulp.src('src/views/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('public'))
});

gulp.task('js', () =>{
    gulp.src('./src/js/**.js')
    .pipe(
        babel(
            {presets: ['@babel/env']}
            )
        ).on('error',(e)=>{console.log('error en la compilacion de babel',e)})
    .pipe(browserify()).on('error',(e)=>{console.log('error en la compilacion de browserify',e)})
    .pipe(gulp.dest('./public/js'));
});

gulp.task('sass', () => {
    gulp.src('./src/scss/style.scss')
        .pipe(sass()).on('error',(e)=>{console.log('error en la compilacion SASS', e)})
        .pipe(postcss(postCSSPluings)).on('error',(e)=>{console.log('error en la compilacion POST CSS'),e})
        .pipe(gulp.dest('./public/css'))
        .pipe(server.stream({ match: '**/*.css' }))
})


gulp.task('default', ['views','sass','js'],() => {
    server.init({
        server: {
            baseDir: './public'
        }
    });

    gulp.watch('./src/js/**/**.js', ['js', server.reload ])
    gulp.watch('./src/views/**/**.pug', ['views', server.reload])
    gulp.watch('./src/scss/**/**.scss', ['sass'])
});