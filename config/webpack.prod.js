const path = require("path") //nodejs 核心模块,用来处理路径问题
const HTMLWebpackPlugin = require("html-webpack-plugin")
const ESLintPlugin = require("eslint-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")

function getStyleLoader(loaderName){
    return [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
            loader: "postcss-loader",
            options:{
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env", // 能解决大多数样式兼容性问题
                    ]
                }
            }
        },
        loaderName
    ].filter(item => item != undefined)
}

module.exports = {
    //入口 相对路径
    entry: './src/main.js',
    //输出
    output:{
        // 文件的输出路径 绝对路径
        path:path.resolve(__dirname,"../dist"),
        // 入口文件输出的文件名
        filename: "static/js/wbepackJs.js",
        // weback5 不需要添加plugin了,直接内置功能,因为功能太基础了不需要分出去pulgin插件
        clean:true,
    },
    // 加载器
    module:{
        rules: [
            //loader配置
            {
                //用来匹配.css结尾的文件
                test: /\.css$/,
                // use数组里面的loader执行顺序是从右到左的
                use:getStyleLoader(),
            },
            {
                test: /\.less$/,
                use:getStyleLoader('less-loader')
            },
            {
                test:/\.s[ac]ss$/,
                use:getStyleLoader('sass-loader')
            },
            {
                test:/\.styl$/,
                use:getStyleLoader('stylus-loader')
            },
            {
                test:/\.(png|jpe?g|gif|webp)$/,
                type:"asset/resource",
                parser:{
                    dataUrlCondition:{
                        // 小于30kb的会被打包成base 64位图片
                        // 可以减少小图片(小于30kb)的请求次数,减少服务器请求压力
                        // 会增加30%打包体积,所以只打包小图片,大图就性价比不高
                        maxSize:30 * 1024
                    }
                },
                // hash webpack生产的hash值
                // ext 图片的后缀png/jpg
                // query 图片的地址参数 ?name="???"
                generator:{
                    filename:"static/img/[hash][ext][query]"
                }
            },
            {
                test:/\.(ttf|woff2?|mp3|map4|avi)$/,
                type:"asset/resource",
                generator:{
                    filename:"static/media/[hash:10][ext][query]"
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }
        ],
    },
    // 插件
    plugins:[
        //plugin 的配置
        new ESLintPlugin({
            // 检测哪些文件
            context:path.resolve(__dirname,"../src")
        }),
        new HTMLWebpackPlugin({
            template:path.resolve(__dirname,'../public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename:"static/css/[name].[contenthash:8].css"
        }),
        new CssMinimizerWebpackPlugin()
    ],
    // 模式
    mode:"production",
    // 生产模式的源代码映射配置:映射到具体哪一行那一列,缺点打包会比较慢
    devtool:"source-map"
}