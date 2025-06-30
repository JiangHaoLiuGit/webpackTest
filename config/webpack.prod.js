const path = require("path") //nodejs 核心模块,用来处理路径问题
const os = require("os")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const ESLintPlugin = require("eslint-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")
const VuePreLoadWebpackPlugin = require("@vue/preload-webpack-plugin")

const threads = os.cpus().length //获取cpu核数

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
        // 入口文件输出的文件名 [name] 单入口的话就是和入口文件名字一致,如果是多入口的话也能这么写.所以非常合适
        filename: "static/js/[name].js",
        // 给打包输出的其他文件命名
        chunkFilename:"static/js/[name].chunk.js",
        // 图片,字体等通过type:asset处理的资源都会打包到这里
        assetModuleFilename:"static/media/[hash][ext][query]",
        // weback5 不需要添加plugin了,直接内置功能,因为功能太基础了不需要分出去pulgin插件
        clean:true,
    },
    // 加载器
    module:{
        rules: [
            {
                oneOf:[
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
                        test:/\.(png|jpe?g|gif|webp|svg)$/,
                        type:"asset",
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
                        // generator:{
                        //     filename:"static/img/[hash][ext][query]"
                        // }
                    },
                    {
                        test:/\.(ttf|woff2?|mp3|map4|avi)$/,
                        type:"asset/resource",
                        // generator:{
                        //     filename:"static/media/[hash:10][ext][query]"
                        // }
                    },
                    {
                        test: /\.js$/,
                        // exclude: /node_modules/,//处理js文件的时候排除node_modules,因为已经处理过了,在处理会变慢,
                        include:path.resolve(__dirname,"../src"), //只处理src下的js文件,其他文件不处理
                        use:[
                            {
                                loader: 'thread-loader',
                                options:{
                                    works:threads,//进程数量
                                }
                            },
                            {
                                loader: 'babel-loader',
                                options:{
                                    cacheDirectory:true,//开启babel缓存
                                    cacheCompression:false,//关闭缓存文件压缩(缺点,占用本地内存,放到node_modules里,优点:打包速度快)
                                    plugins:["@babel/plugin-transform-runtime"],//减少代码体积
                                }
                            }
                        ]
                    }
                ]
            }
        ],
    },
    // 插件
    plugins:[
        //plugin 的配置
        new ESLintPlugin({
            // 检测哪些文件
            context:path.resolve(__dirname,"../src"),
            exclude:"node_modules",//默认值
            cache:true,
            cacheLocation:path.resolve(__dirname,"../node_modules/.cache/eslintCache"),
            threads//开启多进程打包
        }),
        new HTMLWebpackPlugin({
            template:path.resolve(__dirname,'../public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename:"static/css/[name].[contenthash:8].css",
            chunkFilename:"static/css/[name].[contenthash:8].chunk.css"
        }),
        // new CssMinimizerWebpackPlugin(),
        // new TerserWebpackPlugin({
        //     parallel: threads//开启多进程打包
        // }),
        new VuePreLoadWebpackPlugin({
            // 启用preload还是prefetch
            // rel:"preload",
            // // 已sciprt标签引入
            // as:"script"
            rel:"prefetch"
        })

    ],
    // webpack5 推荐压缩的plugin放到这里,以后会只能放到这里
    optimization:{
        minimizer:[
            // 压缩css的,并且创建link标签引入
            new CssMinimizerWebpackPlugin(),
            // terser是webpack生产环境默认激活的压缩js内置插件,这里配置可以加快他的压缩时间
            new TerserWebpackPlugin({
                parallel: threads//开启多进程打包
            })
        ],
        // 代码分割操作
        splitChunks:{
            chunks:"all",
            // 其他的都用默认代码
        }
    },
    devServer:{
        hot:false,//关闭,这里默认是开启(HMR)的,所以生产模式必须写
    },
    // 模式
    mode:"production",
    // 生产模式的源代码映射配置:映射到具体哪一行那一列,缺点打包会比较慢
    devtool:"source-map"
}