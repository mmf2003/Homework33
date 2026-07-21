const { src, dest, watch, series, parallel } = require("gulp");

const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();

function styles() {
    return src("scss/style.scss")
        .pipe(
            sass({
                outputStyle: "expanded",
            }).on("error", sass.logError),
        )

        .pipe(postcss([autoprefixer()]))

        .pipe(dest("css"))

        .pipe(cleanCSS())

        .pipe(
            rename({
                suffix: ".min",
            }),
        )

        .pipe(dest("css"))

        .pipe(browserSync.stream());
}

function server() {
    browserSync.init({
        server: {
            baseDir: "./",
        },
        notify: false,
    });

    watch("scss/**/*.scss", styles);
    watch("*.html").on("change", browserSync.reload);
}

exports.styles = styles;
exports.default = series(styles, server);
