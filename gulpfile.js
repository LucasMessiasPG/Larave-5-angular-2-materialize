process.env.DISABLE_NOTIFIER = true;

var elixir = require('laravel-elixir'),
    webpack = require('webpack');

require('laravel-elixir-livereload');
require('laravel-elixir-webpack-official');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    /**
     * Meterialize
     **/
    var materializePath = 'node_modules/materialize-css/dist';

    mix.copy(materializePath, 'resources/vendor/materialize-css');
    mix.copy(materializePath + '/fonts', 'public/fonts');

    /**
     * JQuery
     **/
    mix.copy('node_modules/jquery/dist/jquery.min.js', 'public/js/jquery');

    /**
     * Sass
     **/
    mix.sass('app.scss');

    /**
     * Scripts webpack bundling and copying
     **/
    mix.webpack(
        [],
        'public/js',
        'resources/assets/typescript',
        {
            entry: {
                app: './resources/assets/typescript/main.ts',
                vendor: './resources/assets/typescript/vendor.ts'
            },
            debug: true,
            devtool: 'source-map',
            resolve: {
                extensions: ['', '.ts', '.js']
            },
            module: {
                loaders: [
                    {
                        test: /\.ts$/,
                        loader: 'awesome-typescript-loader',
                        exclude: /node_modules/
                    }
                ]
            },
            plugins: [
                new webpack.ProvidePlugin({
                    '__decorate': 'typescript-decorate',
                    '__extends': 'typescript-extends',
                    '__param': 'typescript-param',
                    '__metadata': 'typescript-metadata'
                }),
                new webpack.optimize.CommonsChunkPlugin({
                    name: 'vendor',
                    filename: 'vendor.js',
                    minChunks: Infinity
                }),
                new webpack.optimize.CommonsChunkPlugin({
                    name: 'app',
                    filename: 'app.js',
                    minChunks: 4,
                    chunks: [
                        'app'
                    ]
                }),
                /*new webpack.optimize.UglifyJsPlugin({
                 compress: {
                 warnings: false
                 },
                 minimize: true,
                 mangle: false
                 })*/
            ]
        }
    );

    /**
     * LiveReload
     **/
    mix.livereload([
        'public/css/**/*',
        'public/fonts/**/*',
        'public/js/**/*'
    ]);
});
