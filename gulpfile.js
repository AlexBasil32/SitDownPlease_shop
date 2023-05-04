const { src, dest, series, watch } = require('gulp'),
  htmlMin = require('gulp-htmlmin'),
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  autoprefixer = require('gulp-autoprefixer'),
  sprite = require('gulp-svg-sprite'),
  webpack = require('webpack-stream'),
  csscomb = require('gulp-csscomb'),
  sass = require('gulp-sass')(require('sass')),
  notify = require('gulp-notify'),
  webp = require('gulp-webp'),
  del = require('del'),
  sourcemaps = require('gulp-sourcemaps'),
  browserSync = require('browser-sync').create();

const clean = () => {
  return del('dist');
};

const svgSprites = () => {
  return src('./src/sprite/*.svg')
    .pipe(sprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('dist'));
};

const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(htmlMin({
      collapseWhitespace: true
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
};

const formatScss = () => {
  return src('src/sass/**/*.scss', { base: './' })
    .pipe(csscomb())
    .pipe(dest('./'));
};

const styles = () => {
  return src('src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    })).on('error', notify.onError())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/styles/'))
    .pipe(browserSync.stream());
};

const copyFonts = () => {
  return src([
    'src/fonts/**/*.woff2',
    'src/fonts/**/*.woff'
  ])

    .pipe(dest('dist/fonts'));
};

const imgCompress = () => {
  return src([
    'src/img/images/**/*.jpg',
    'src/img/images/**/*.jpeg',
    'src/img/images/**/*.png'
  ])
    .pipe(dest('dist/img/images'));
};

const webpImg = () => {
  return src([
    'src/img/images/**/*.jpg',
    'src/img/images/**/*.jpeg',
    'src/img/images/**/*.png'
  ])
    .pipe(webp())
    .pipe(dest('dist/img/webp'));
};

const faviconFiles = () => {
  return src([
    'src/favicon/**/*.png',
    'src/favicon/**/*.xml',
    'src/favicon/**/*.ico',
    'src/favicon/**/*.json'
  ])

    .pipe(dest('dist/favicon'));
};

const copySvg = () => {
  return src('src/img/svg/*.svg')
    .pipe(dest('dist/img/svg'));
};

const scripts = () => {
  return src([
    'src/js/main.js'
  ])
    .pipe(webpack({
      mode: 'development',
      output: {
        filename: 'app.js'
      },
      watch: false,
      devtool: "source-map",
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', {
                  debug: true,
                  corejs: 3,
                  useBuiltIns: "usage"
                }]]
              }
            }
          }
        ]
      }
    }))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
};

watch('src/**/*.html', htmlMinify);
watch('src/sass/**/*.scss', styles);
watch('src/js/**/*.js', scripts);
watch('src/sprite/**/*.svg', svgSprites);

exports.comb = formatScss;
exports.default = series(clean, copyFonts, htmlMinify, styles, imgCompress, webpImg, svgSprites, faviconFiles, copySvg, scripts, watchFiles);

const buildClean = () => {
  return del('build');
};

const buildStyles = () => {
  return src('src/sass/**/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    })).on('error', notify.onError())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(dest('build/styles/'));
};

const copyBuildFonts = () => {
  return src([
    'src/fonts/**/*.woff2',
    'src/fonts/**/*.woff'
  ])
    .pipe(dest('build/fonts'));
};

const buildHtmlMinify = () => {
  return src('src/**/*.html')
    .pipe(htmlMin({
      collapseWhitespace: true
    }))
    .pipe(dest('build'));
};

const buildsvgSprites = () => {
  return src('./src/sprite/*.svg')
    .pipe(sprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('build'));
};

const buildImgCompress = () => {
  return src([
    'src/img/images/**/*.jpg',
    'src/img/images/**/*.jpeg',
    'src/img/images/**/*.png'
  ])
    .pipe(dest('build/img/images'));
};

const buildWebpImg = () => {
  return src([
    'src/img/images/**/*.jpg',
    'src/img/images/**/*.jpeg',
    'src/img/images/**/*.png'
  ])
    .pipe(webp())
    .pipe(dest('build/img/webp'));
};

const buildFaviconFiles = () => {
  return src([
    'src/favicon/**/*.png',
    'src/favicon/**/*.xml',
    'src/favicon/**/*.ico',
    'src/favicon/**/*.json'
  ])

    .pipe(dest('build/favicon'));
};

const buildCopySvg = () => {
  return src('src/img/svg/*.svg')
    .pipe(dest('build/img/svg'));
};

const buildScripts = () => {
  return src([
    'src/js/main.js'
  ])
    .pipe(webpack({
      mode: 'production',
      output: {
        filename: 'app.js'
      },
      watch: false,
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', {
                  debug: true,
                  corejs: 3,
                  useBuiltIns: "usage"
                }]]
              }
            }
          }
        ]
      }
    }))
    .pipe(dest('build/js'));
};

exports.build = series(buildClean, buildHtmlMinify, copyBuildFonts, buildStyles, buildsvgSprites, buildImgCompress, buildWebpImg, buildFaviconFiles, buildCopySvg, buildScripts);
