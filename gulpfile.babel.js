// generated on 2018-08-20 using generator-chrome-extension 0.7.1
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'

const $ = gulpLoadPlugins()

export const babel = () => {
  return gulp
    .src('app/scripts.babel/**/*.js')
    .pipe(
      $.babel({
        presets: ['es2015']
      })
    )
    .pipe(gulp.dest('app/scripts'))
}

gulp.task(
  'watch',
  gulp.series(babel, () => {
    $.livereload.listen()

    gulp
      .watch([
        'app/*.html',
        'app/scripts/**/*.js',
        'app/images/**/*',
        'app/styles/**/*',
        'app/_locales/**/*.json'
      ])
      .on('change', $.livereload.reload)

    gulp.watch('app/scripts.babel/**/*.js', gulp.series(babel))
  })
)
