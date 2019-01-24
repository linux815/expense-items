const path = require('path')
const mix = require('laravel-mix')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

mix
    .js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .less('resources/less/app.less', 'public/css')

    .sourceMaps()
    .disableNotifications()

if (mix.inProduction()) {
    mix.version()

    mix.extract([
        'vue',
        'vform',
        'axios',
        'vuex',
        'iview',
        'vue-i18n',
        'vue-meta',
        'vue-router',
        'vuex-router-sync'
    ])
}

mix.webpackConfig({
    plugins: [
        // new BundleAnalyzerPlugin()
    ],
    resolve: {
        extensions: ['.js', '.json', '.vue'],
        alias: {
            '~': path.join(__dirname, './resources/js')
        }
    },
    output: {
        publicPath: '/',
        chunkFilename: 'js/[name].[chunkhash].js'
    }
})
