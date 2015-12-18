const gulp = require("gulp");
const uglify = require("gulp-uglify");
const header = require("gulp-header");
const jshint = require("gulp-jshint");
const rename = require("gulp-rename");
const mochaPhantomjs = require("gulp-mocha-phantomjs");
const pkg = require("./package.json");

const pluginName = "HashHandler";

const banner = ["/**",
    " * " + pluginName + " v<%= pkg.version %> - <%= pkg.description %>",
    " * Copyright " + new Date().getFullYear() + " <%= pkg.author.name %> - <%= pkg.homepage %>",
    " * License: <%= pkg.license %>",
    " */",
""].join("\n");

gulp.task("build", ["lint"], () => {
    return gulp.src(`src/${pluginName}.js`)
        .pipe(rename({ suffix: ".min" }))
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest("dist/"));

});

gulp.task("lint", () => {
    return gulp.src(`src/${pluginName}.js`)
        .pipe(jshint())
        .pipe(jshint.reporter("jshint-stylish"));
});

gulp.task("test", () => {
    return gulp.src("test/runner.html")
        .pipe(mochaPhantomjs({
            reporter: "spec"
        }));
});

gulp.task("default", ["build", "test"]);