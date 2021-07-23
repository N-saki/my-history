const { src, dest, watch } = require("gulp");
// Sassをコンパイルするプラグインの読み込み
const sass = require('gulp-sass')(require('sass'));
const pug = require("gulp-pug");
const browserSync = require("browser-sync");

var paths = {
 'root': '.',
 'sass': 'src/sass/',
 'css': 'dist/css/',
 'pug': 'src/pug/',
 'html': 'dist/html/'
}

// Sassのコンパイル
const compileSass = () =>
 // style.sassファイルを取得
 src(paths.sass + '**/*.sass')
  .pipe(
   sass({
    outputStyle: "expanded"
   })
  )
  .pipe(dest(paths.css));

// Pugのコンパイル
const compilePug = () =>
 src(paths.pug + "**/*.pug")
  .pipe(
   pug({
    pretty: true
   })
  )
  .pipe(dest(paths.html));

// Sass,Pugファイルの監視
const watchSrcFiles = () => {
 watch(paths.pug + '**/*.pug', compilePug);
 watch(paths.sass + '**/*.sass', compileSass);
}

// Browser Sync
const taskServer = () =>
 browserSync.init({
  server: {
   //ルートディレクトリの指定
   baseDir: paths.root,
   index: "index.html",
  }

 });

const reload = (done) => {
 browserSync.reload();
 done();
}

watch(paths.html + "**/*.html", reload);
watch(paths.css + "**/*.css", reload);

exports.default = () =>
 watchSrcFiles();
taskServer();