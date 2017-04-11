var gulp = require( "gulp" ),
	less = require( "gulp-less" ),				//less编译
	minify = require( "gulp-minify-css" ), 		//压缩css
	connect = require( 'gulp-connect' ),		//服务
	rename = require( "gulp-rename" ),			//重命名
	concat = require( 'gulp-concat' ),			//合并文件
	amd = require("amd-optimize"),				//
	uglify = require('gulp-uglify'),			//压缩js		
	rev = require('gulp-rev'),					//加密
	collector = require('gulp-rev-collector'),	//路径
	mockServer = require('gulp-mock-server');	//数据

gulp.task("less",function(){
	gulp.src("./dev/public/css/style.less")
	.pipe(less())
	.pipe(gulp.dest("./dev/public/css/"))
	.pipe(minify())
	.pipe(rename("style.main.less"))
	.pipe(gulp.dest("./dev/public/css/"));
})

gulp.task("webserver",function(){
	connect.server({
		root:"./dev/",
		port:8080,
		livereload:true
	})
})

gulp.task("reload",function(){
	gulp.src( [
		"dev/index.html",
		"dev/controllers/**/*.html",
		"dev/components/**/*.html",
		"dev/public/css/*.less",
		"dev/public/less/*.less",
		"dev/public/less/**/*.less",
		"dev/index.js",
		"dev/**/*.js",
		"dev/**/**/*.js"
	] )
	.pipe(connect.reload());
})

gulp.task("watch",function(){
	gulp.watch([
		"./dev/public/css/*.less",
		"./dev/public/less/*.less",
		"./dev/public/less/**/*.less"
		],["less","reload"])
	gulp.watch([
		"./dev/index.html",
		"./dev/controllers/**/*.html",
		"./dev/components/**/*.html"
		],["reload"])
	gulp.watch([
		"./dev/index.js",
		"./dev/**/*.js",
		"./dev/**/**/*.js"
		],["reload"])
})

gulp.task("default",["less","webserver","watch"]);