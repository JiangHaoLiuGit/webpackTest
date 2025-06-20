````js
//loader 使用 => 如果不熟悉推荐去官方文档中找 https://webpack.docschina.org/loaders/ 官方文档找不到的话，可以从社区 Github 中搜索查询
// webpack 能处理js文件所以打包不用引入loader,如果要处理其他的非js文件,比如css,那就要配置loader文件
// 处理css 需要的loader
// css-loader 将css编译成webpack能识别的模块
// style-loader 创建一个style标签,里面放置的是webpack处理后的css模块内容
// less-loader webpack处理less文件
// sass-loader webpack处理sass/scss文件
// stylus-loader webpack处理.styl文件
// 处理图片资源
// 修改图片输出目录
// 自动清空上次打包内容
// 处理字体文件
// 处理js文件 因为现在打包的js,比如es6的箭头函数,promise打包出来仍然是js6语法,有些浏览器不认识es6,比如ie浏览器,这种代码放到ie浏览器直接白屏,客户要骂娘了,至少要兼容ie11吧,所以得进一步打包配置
// 为什么要引入eslint ,eslint能干嘛,用的时候该怎么用
// babel 为什么引入
// 处理html,为什么要处理,不处理行不行,他会自动引入生成的js和css,比如mini-css-webpack-plugin生成的mian.css他会通过link的形式自动引入,js也会自动引入webpackJs.js,如果有多个js生产而且还有复杂先后关系,怕你开发者搞乱了,这点也做的不错,自动引入就不会出错


// 入门基本学的差不多了,面试问,webpack怎么处理css/js/html/img/其他类型,比如字体,word文档,excel文档,视频,音频文件

// 搭建开发服务器和生产服务器并配置npm 命令启动

// 为什么要把css单独打包,现在就这样不好吗,为什么

// css 兼容性怎么处理,如果要写ie >= 8怎么做配置

//封装cssloader使用

// css压缩怎么做,面试问到怎么说

// webpack基础学完了
// 你可以说一下生产和开发有什么区别?

// 高级webpack部分 主要是webpack优化
// sourceMap 为什么要开启,怎么用
// 生产模式和开发模式需要做到什么程度的源代码映射?

// hostModuleReplace 模式 简称host:true
// 但有劣势的,js文件不支持,只支持改了css样式可以补充下打包,因为style-loader支持这个HMR
// js文件要想用HMR得话得自己写js代码
// 但是写vue/react项目的时候不要要写这些js代码,因为vue-loader/react-hot-loader帮我们做这些事情了,所以vue/react项目还是非常给力的
````
