var gulp = require("gulp"),
    less = require("gulp-less"),
    autoprefixer = require("gulp-autoprefixer"),
    minifycss = require("gulp-minify-css"),
    jshint = require("gulp-jshint"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    concat = require("gulp-concat"),
    notify = require("gulp-notify"),
    cache = require("gulp-cache"),
    livereload = require("gulp-livereload"),
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
    return gulp.src(["script/app.js", "script/loader.js"])
        .pipe(rename({suffix: ".min"}))
        .pipe(uglify())
        .pipe(gulp.dest("script/"))
        .pipe(notify({ message: "Scripts task complete" }));
});

gulp.task("clean", function(cb) {
    del(["styles/*.css", "script/*.min.js"], cb);
});

gulp.task("default", ["clean"], function() {
    gulp.start("styles", "scripts");
});

gulp.task("watch", function() {
    gulp.watch("styles/**/*.less", ["styles"]);
    gulp.watch("script/**/*.js", ["scripts"]);
    livereload.listen();

    gulp.watch(["styles/**", "script/**"]).on("change", livereload.changed);

});