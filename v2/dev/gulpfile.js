const gulp = require('gulp');
const pug = require('gulp-pug');
const babel = require('gulp-babel');

gulp.task('views', function () {
    return gulp.src('src/views/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('public'))
});

gulp.task('js', () =>
	gulp.src('src/js/main.js')
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(gulp.dest('public/js'))
);


gulp.task('default',['views'],()=>{

});