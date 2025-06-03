const path = require("path") //nodejs 核心模块,用来处理路径问题
module.exports = {
    //入口 相对路径
    entry: './src/main.js',
    //输出
    output:{
        // 文件的输出路径 绝对路径
        path:path.resolve(__dirname,"dist"),
        // 文件名
        filename: "wbepackJs.js"
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
            }
        ],
    },
    // 插件
    plugins:[
        //plugin 的配置
    ],
    // 模式
    mode:"development",
}