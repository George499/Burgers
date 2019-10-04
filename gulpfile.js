const { src, dest, task, series, watch } = require("gulp")
const rm = require("gulp-rm")
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-px-to-rem');
const pxtorem = require('postcss-pxtorem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo')
const svgSprite = require('gulp-svg-sprite')
const gulpif = require('gulp-if');
const svgmin = require('gulp-svgmin');

const env = process.env.NODE_ENV;


sass.compiler = require('node-sass');

task('clean', () => {

    return src('dist/**/*', { read: false }).pipe(rm())
});
task("copy:html", () => {
    return src("src/*.html")
        .pipe(dest("dist"))
        .pipe(reload({ stream: true }))
})
task("copy:img", () => {
    return src("src/images/**/*")
        .pipe(dest("dist/images"))
        .pipe(reload({ stream: true }))
})
task("copy:fonts", () => {
    return src("src/fonts/**/*")
        .pipe(dest("dist/fonts"))
        .pipe(reload({ stream: true }))
})
task("icons", () => {
    return src('src/images/icons/*.svg')
    .pipe(svgmin({
      plugins: [{
          removeDoctype: false
      }, {
          removeComments: false
      }, {
          cleanupNumericValues: {
              floatPrecision: 2
          }
      }, {
          convertColors: {
              names2hex: false,
              rgb2hex: false
          }
      }]
}))
  .pipe(dest("dist/images/icons"));
});
    

const styles = [
    "node_modules/normalize.css/normalize.css",
    "src/styles/main.scss"
];

task("styles", () => {
    return src(styles)
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(concat('main.scss'))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(px2rem({accuracy:1,
                      rootPX:16}))
        // .pipe(px2rem({  
        //     rem: 16         
        //   }))
        // .pipe(autoprefixer({
        //     browsers: ['last 2 versions'],
        //     cascade: false
        // }))
        .pipe(gulpif(env === 'prod', gcmq()))
        .pipe(gulpif(env === 'prod', cleanCSS({ compatibility: 'ie8' })))
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(dest('dist/styles'));
})
task('scripts', () => {
    return src('src/index.js')
        .pipe(sourcemaps.init())
        .pipe(concat('index.js', { newLine: ';' }))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(dest('dist'));
});

task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: false,
        online: true

    });
});

watch("src/styles/**/*.scss", series("styles"));
watch("*.html", series("copy:html"))
watch("src/index.js", series("scripts"))
watch("images/svg/*.svg", series("icons"))

task("default", series("clean", "copy:html", "copy:img", "copy:fonts", "styles", "scripts", "icons", "server"))