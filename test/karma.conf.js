module.exports = function(config) {
    config.set({

        files: [
            '../node_modules/babel-polyfill/dist/polyfill.min.js',
            './specs/**/*.test.js'
        ],

        exclude: ['**/node_modules/**/*.test.js'],

        frameworks: ['mocha', 'chai'],

        logLevel: config.LOG_INFO, //config.LOG_DISABLE, // config.LOG_INFO
        singleRun: false,

        preprocessors: {
            './specs/**/*.test.js': ['webpack', 'coverage'],
            '../src/**/*.js': ['coverage'],
        },
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            dir: '../coverage/',
            reporters: [
                { type: 'html', subdir: 'html' },
                { type: 'cobertura', subdir: 'cobertura' },
                { type: 'text-summary', subdir: '.', file: 'text-summary.txt' }
            ]
        },
        webpack: {
            devtool: 'inline-source-map',
            module: {

                loaders: [

                    {
                        test: /\.js$/,
                        loader: 'babel-loader',
                        exclude: /(node_modules|bower_components)/,
                    },
                    {
                        test: /\.less$/,
                        use: [
                            {
                                loader: 'style-loader'
                            },
                            {
                                loader: 'css-loader'
                            },
                            {
                                loader: 'less-loader'
                            }
                        ],
                    }
                ]
            }
        },
        webpackServer: {
            noInfo: true
        },
        plugins: [
            'karma-webpack',
            'karma-mocha',
            'karma-chai',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-sourcemap-loader',
            'karma-coverage'
        ],
        browsers: ['PhantomJS'], // ['Chrome']
        concurrency: Infinity
    });
};
