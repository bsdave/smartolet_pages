const { watch, src, dest } = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  uglifyjs = require('gulp-uglify-es').default,
  concat = require('gulp-concat');

function css() {
  return src('src/uncompiled_scss/style.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .on("error", sass.logError)
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(dest('assets/styles/'))
};

function js() {
  return src(['src/uncompiled_js/jquery.js', 'src/uncompiled_js/main.js'])
    .pipe(concat('main.js'))
    .pipe(uglifyjs())
    .pipe(dest('assets/javascript/'))
};

function loopCompiling() {
  watch('src/uncompiled_scss/**/*', css);
  watch('src/uncompiled_js/**/*', js);
}

exports.default = loopCompiling;
