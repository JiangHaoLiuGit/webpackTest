const path = require("path") //nodejs 核心模块,用来处理路径问题
const os = require("os")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const ESLintPlugin = require("eslint-webpack-plugin")

const threads = os.cpus().length //获取cpu核数

module.exports = {
    //入口 相对路径
    entry: './src/main.js',
    //输出
    output:{
        // 开发模式不需要输出文件名地址
        path:undefined,
        // 入口文件输出的文件名 [name] 单入口的话就是和入口文件名字一致,如果是多入口的话也能这么写.所以非常合适
        filename: "static/js/[name].js",
        // 给打包输出的其他文件命名
        chunkFilename:"static/js/[name].chunk.js",
        // 图片,字体等通过type:asset处理的资源都会打包到这里
        assetModuleFilename:"static/media/[hash][ext][query]",
        // 开发模式不需要开启这个
        clean:false,
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
                        use:['style-loader','css-loader'],
                    },
                    {
                        test: /\.less$/,
                        use:['style-loader','css-loader','less-loader']
                    },
                    {
                        test:/\.s[ac]ss$/,
                        use:[
                            'style-loader',// 将 JS 字符串生成为 style 节点
                            'css-loader',// 将 CSS 转化成 CommonJS 模块
                            'sass-loader'// 将 Sass 编译成 CSS
                        ]
                    },
                    {
                        test:/\.styl$/,
                        use:['style-loader','css-loader','stylus-loader']
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
                                    plugins:["@babel/plugin-transform-runtime"],//减少babel产生的代码体积
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
            threads//开启多进程打包
        }),
        new HTMLWebpackPlugin({
            template:path.resolve(__dirname,'../public/index.html')
        })
    ],
    //开发服务器
    devServer:{
        host:"localhost",// 启动服务器域名
        port:3000,// 端口号
        open:true,// 是否自动打开
        hot:true,//是否开启热模块替换
    },
    // 模式
    mode:"development",
    // 开发模式的源代码映射配置:只映射到哪一行,构建更快
    devtool:"cheap-module-source-map"
}