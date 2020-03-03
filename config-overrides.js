const { override, fixBabelImports, addLessLoader, addWebpackAlias, setWebpackPublicPath, disableEsLint } = require('customize-cra');

process.env.GENERATE_SOURCEMAP = "false";//打包不生成sourceMap

console.log(process.env.NODE_ENV)

const configureWebpack = () => config => {
    config.plugins[0].options.env = process.env.NODE_ENV
    if (process.env.NODE_ENV === 'production'){
        config.externals = {
            "react": "React",
            "react-dom": "ReactDOM",
            "axios": "axios"
        }
        config.plugins[0].options.minify = {
            minifyCSS: true,
            minifyJS: true,
            removeComments: true,
            collapseWhitespace: true
          }
          const path = require('path');
          const paths = require('react-scripts/config/paths');
          paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist');
          config.output.path = path.join(path.dirname(config.output.path), 'dist');
    } else {
        console.log('走的本地')
    }
    return config;
}

module.exports = {
    webpack:override(
        fixBabelImports('import', {
            libraryName:'antd',
            libraryDirectory: 'es',
            style: true,
        }),
        addLessLoader({
            javascriptEnabled: true,
            modifyVars: { '@primary-color': '#1890ff' },
        }),
        configureWebpack(),
        disableEsLint(),
        process.env.NODE_ENV === 'production' ?
        setWebpackPublicPath(process.env.REALEASE === 'prod' ? 'zhengshifuCdn' : 'ceshifuCdn'): setWebpackPublicPath('./'),
        addWebpackAlias({
            ["@"]: require('path').resolve(__dirname, "src"),
        ['@ant-design/icons/lib/dist$']: require('path').resolve(__dirname, './src/icons.js')
        })
    )
}