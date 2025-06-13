const path = require("path") //nodejs 核心模块,用来处理路径问题
module.exports = {
    //入口 相对路径
    entry: './src/main.js',
    //输出
    output:{
        // 文件的输出路径 绝对路径
        path:path.resolve(__dirname,"dist"),
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
        ],
    },
    // 插件
    plugins:[
        //plugin 的配置
    ],
    // 模式
    mode:"development",
}