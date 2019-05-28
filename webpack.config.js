const path = require("path");
const HappyPack = require("happypack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 并行压缩js
const WebpackParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
const HtmlWebpackPluginConfig = {
    title: "sdd-management",
    filename: "index.html",
    template: "template.html",
    // true|body|head|false，四种值，默认为true
    // true和body相同,是将js注入到body结束标签前
    // head将打包的js文件放在head结束前
    // false是不注入，这时得要手工在html中加js
    inject: true
};

module.exports = {
    entry: "./src/main.tsx",
    mode: "development",
    devtool: "source-map",
    output: {
        filename: "[name].[hash].bundle.js",
        // path: path.resolve(__dirname, 'dist')
        path: __dirname + "/dist"
    },
    resolve: {
        extensions: [".js", ".jsx", ".pcss", ".tsx", ".ts"],
        alias: {
            pages: path.resolve(__dirname, "src/pages/"),
            components: path.resolve(__dirname, "src/components/"),
            routers: path.resolve(__dirname, "src/routers/"),
            store: path.resolve(__dirname, "src/store/"),
            utils: path.resolve(__dirname, "src/utils/"),
            common: path.resolve(__dirname, "src/common/")
        }
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts|jsx|js)$/,
                use: "happypack/loader?id=tsx",
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(pcss|css)$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader"
                        // options: {
                        //     modules: true, // css modules
                        //     localIdentName: '[name]__[local]___[hash:base64:5]'
                        // }
                    },
                    {
                        loader: "less-loader"
                    },
                    {
                        loader: "sass-loader"
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            // 如果没有options这个选项将会报错 No PostCSS Config found
                            ident: "postcss",
                            plugins: [
                                require("autoprefixer")({
                                    browsers: ["last 10 versions"]
                                }), // CSS浏览器兼容
                                require("cssnano")(), // 压缩css
                                require("postcss-nested")() // css嵌套
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(HtmlWebpackPluginConfig),
        // new webpack.optimize.ModuleConcatenationPlugin(),
        new HappyPack({
            id: "tsx",
            threads: 4,
            loaders: ["babel-loader"]
        })
        // new WebpackParallelUglifyPlugin({
        //     uglifyJS: {
        //         output: {
        //             beautify: false, // 不需要格式化
        //             comments: false // 不保留注释
        //         },
        //         compress: {
        //             warnings: true, // 在UglifyJs删除没有用到的代码时输出警告
        //             drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
        //             collapse_vars: true, // 内嵌定义了但是只用到一次的变量
        //             reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
        //         }
        //     },
        //     cacheDir: './src/'
        // })
    ],
    devServer: {
        // 本地服务器所加载的页面所在的目录
        contentBase: path.join(__dirname, "dist"),
        // 是否启用 gzip 压缩
        // compress: true,
        // 监听的端口，省略的话则为8080
        port: 9000,
        // 源文件改变时，会自动刷新页面
        inline: true,
        // 终端输出的文件为彩色的
        // color: true,
        // 依赖HTML5 history api,设置为true,所有的跳转指向index.html
        // historyApiFallback: true,
        // 热加载
        hot: true
    }
};
