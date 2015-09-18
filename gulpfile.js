var gulp = require("gulp"),
    less = require("gulp-less"),
    autoprefixer = require("gulp-autoprefixer"),
    minifycss = require("gulp-minify-css"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    notify = require("gulp-notify"),
    livereload = require("gulp-livereload"),
    gulpsync = require('gulp-sync')(gulp),
    serve = require('gulp-serve'),
    del = require("del");

gulp.task("styles", function() {
    return gulp.src("styles/app.less")
        .pipe(less({ style: "expanded" }))
        .pipe(autoprefixer({
            browsers: ["last 5 version", "ff >= 26", "safari >= 4", "ie >= 9", "opera 12.1", "ios >= 6", "android >= 3"],
            cascade: true
        }))
        .pipe(gulp.dest("styles/"))
        .pipe(rename({suffix: ".min"}))
        .pipe(minifycss())
        .pipe(gulp.dest("styles/"))
        .pipe(notify({ message: "Styles task complete" }));
});

gulp.task("scripts", function() {
    return gulp.src(["script/app.js", "script/loader.js", "script/templateParser.js", "script/fileParser.js", "script/ratata.js"])
        .pipe(rename({suffix: ".min"}))
        .pipe(uglify())
        .pipe(gulp.dest("script/"))
        .pipe(notify({ message: "Scripts task complete" }));
});

gulp.task("clean", function(cb) {
    del(["styles/*.css", "script/*.min.js"], cb);
});

gulp.task("reloadPage", function() {
    livereload.reload();
});

gulp.task('serve', serve({
    root: ['.'],
    port: 3000
}));

gulp.task("default", ["serve"], function(){});
gulp.task("run", ["clean"], function(){
    gulp.start("styles", "scripts");
});

gulp.task("watch", function() {
    livereload.listen();
    gulp.watch("styles/**/*.less", gulpsync.sync(["styles", "reloadPage"]));
    gulp.watch("script/**/*.js", gulpsync.sync(["scripts", "reloadPage"]));
    gulp.watch("index.html", ["reloadPage"]);
});