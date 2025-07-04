const path = require("path")
const ESLintWebpackPlugi = require("eslint-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const {VueLoaderPlugin} = require("vue-loader")
const {DefinePlugin} = require("webpack")

function getStulyeLoaders(name){
    return [
        "vue-style-loader",
        "css-loader",
        {
            loader:"postcss-loader",
            options:{
                postcssOptions:{
                    plugins:[
                        "postcss-preset-env",//能解决大部分样式兼容性问题
                    ]
                }
            }
        },
        name
    ].filter(Boolean)
}

module.exports = {
    entry:"./src/main.js",
    output:{
        path:undefined,
        filename:"static/js/[name].js",
        chunkFilename:"static/js/[name].chunk.js",
        assetModuleFilename:"static/js/[hash:10][ext][query]",
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:getStulyeLoaders()
            },
            {
                test:/\.less$/,
                use:getStulyeLoaders("less-loader")
            },
            {
                test:/\.s[ac]ss$/,
                use:getStulyeLoaders("sass-loader")
            },
            {
                test:/\.styl$/,
                use:getStulyeLoaders("stylus-loader")
            },
            {
                test:/\.(png|jpe?g|gif|svg)$/,
                type:"asset",
                parser:{
                    dataUrlCondition:{
                        maxSize:10 * 1024,
                    }
                }
            },
            {
                test:/\.(ttf|woff2?)$/,
                type:"asset/resource",
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname,"../src"),
                loader:"babel-loader",
                options:{
                    // 开启babel缓存功能
                    cacheDirectory:true,
                    cacheCompression:false,
                }
            },
            {
                test:/\.vue$/,
                use:['vue-loader']
            }
        ]
    },
    plugins:[
        new ESLintWebpackPlugi({
            context:path.resolve(__dirname,"../src"),
            exclude:"node_module",
            cache:true,
            cacheLocation:path.resolve(
                __dirname,
                "../node_modules/.cache/.eslintcache"
            ),
        }),
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,"../public/index.html"),
        }),
        new CopyPlugin({
            patterns: [
              {
                from: path.resolve(__dirname, "../public"),
                to: path.resolve(__dirname, "../dist"),
                toType: "dir",
                noErrorOnMissing: true, // 不生成错误
                globOptions: {
                  // 忽略文件
                  ignore: ["**/index.html"],
                },
                info: {
                  // 跳过terser压缩js
                  minimized: true,
                },
              },
            ],
        }),
        new VueLoaderPlugin(),
        // cross-env定义的环境变量是给打包工具使用的
        // DefinePlugin定义的环境变量是给源代码使用的,从而解决vue3页面报错的问题
        new DefinePlugin({
            __VUE_OPTIONS_API__:true,
            __VUE_PROD_DEVTOOLS__:false,
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__:false
        })
    ],
    optimization:{
        splitChunks:{
            chunks:"all",
        },
        runtimeChunk:{
            name:(etrypoint) => `runtime~${etrypoint.name}`,
        },
    },
    resolve:{
        extensions:[".vue",".js",".json"] , //自动补全文件扩展名,比如react中引入Home组件可以简写Home/index,省略jsx,在vue中引入默认是vue拓展名
    },
    mode:"development",
    devServer:{
        host:"localhost",
        port:8080,
        open:true,
    },
    devtool:"cheap-module-source-map",
}