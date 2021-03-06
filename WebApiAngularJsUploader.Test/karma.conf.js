﻿// Karma configuration
// Generated on Mon Nov 03 2014 14:10:39 GMT+0900 (Tokyo Standard Time)

module.exports = function (config) {
    config.set({
        
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '../WebApiAngularJsUploader',        
        
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine','sinon'],      
        
        files: [
            'scripts/angular.js',
            'scripts/angular-resource.js',
            'scripts/angular-route.js',
            'scripts/angular-mocks.js',
            'app/*.js',
            'app/eg*.js',
            'app/**/eg*.html', 
            'app/**/*.module.js',            
            'app/**/*.js',            
            'app/**/eg*.html',                        
            '../WebApiAngularJsUploader.Test/specs/*.js'
        ],
              
        // list of files to exclude
        exclude: [
            'scripts/angular*.min.js',
            'scripts/angular-scenario.js' //this is important angular-scenario getting loaded will stop unit tests running
        ],
        
        ngHtml2JsPreprocessor: {            
            module: 'templates'     
        },
        
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'app/**/*.html':'ng-html2js'
        },
        
        
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'xml'],
        
        xmlReporter: {
            outputFile: '../WebApiAngularJsUploader.Test/test-results.testxml'
        },
        
        
        // web server port
        port: 9876,
        
        
        // enable / disable colors in the output (reporters and logs)
        colors: true,
        
        
        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        
        
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
        
        
        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],
        
        
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
