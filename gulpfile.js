var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jsFiles = ['*.js' , 'src/**/*.js'];
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

gulp.task('style' ,function(){
   return gulp.src(jsFiles)
       .pipe(jshint())
       .pipe(jshint.reporter('jshint-stylish',{verbose:true}))
       .pipe(jscs());
   
});


gulp.task('inject' ,function(){
    var wiredep = require('wiredep').stream;
    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        
    };
    
    return gulp.src('./src/views/*.html')
    .pipe(wiredep(options))
    .pipe(gulp.dest('./src/views'));
});

gulp.task('serve' , ['style', 'inject'], function(){
    var options = {
        script: 'app.js',
        delayTime:1,
        env: {
            'PORT' :5000
        },
        watch: jsFiles
    };
    
    return nodemon(options)
        .on('restart',function(event){
        console.log('Restarting....');
    });
    
});