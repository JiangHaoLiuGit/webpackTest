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
// npx webpack server --config 'webpack.dev.js' 开发环境
// npx webpack --config "webpack.prod.js" 生产环境
// 配置的话 scripts:{
//     dev:"webpack server --config 'webpack.dev.js'",
//     build:"webpack --config 'webpack.prod.js'"
// }
//为什么不用npx 因为npm run dev 会默认去node_modeuls>.bin目录找webpack开启服务

// 为什么要把css单独打包,现在就这样不好吗,为什么
// 因为他会把css打包到js文件中去,运行js文件的同时会解析css,生成style标签生效css属性,如果网速慢就会闪屏

// css 兼容性怎么处理,如果要写ie >= 8怎么做配置
// 引入postcss-loader可以处理兼容性,同时在package.json中写"browserslist":["ie >= 8"]但一般配置都是browserslist:["last 2 version","> 1%","not dead"],全球使用率超过1%的浏览器,同时不要停止维护的浏览器,同时只兼容最近发布的两个版本

//封装cssloader使用

// css压缩怎么做,面试问到怎么说
// 用minizi-css-loader,可以去webpack中的loader搜怎么用,把配置粘贴过来就能配置

// webpack基础学完了


// 高级webpack部分 主要是webpack优化
// sourceMap 为什么要开启,怎么用 在配置文件中写 devtools 生产:"source-map"(定位具体多少行,多少列错误,因为压缩过了,要具体体现错误位置),开发:"cheap-module-source-map"(因为没有压缩过,只是balel转义过的,定位具体那个js,中多少行的错)
// 生产模式和开发模式需要做到什么程度的源代码映射?

// hostModuleReplace 模式 简称host:true
// 但有劣势的,js文件不支持,只支持改了css样式可以补充下打包,因为style-loader支持这个HMR
// js文件要想用HMR得话得自己写js代码
// 但是写vue/react项目的时候不要要写这些js代码,因为vue-loader/react-hot-loader帮我们做这些事情了,所以vue/react项目还是非常给力的
// 生产模式记得关闭,因为生产不需要开启,而默认是开启的

// 高级 oneOf 能干嘛,不用会怎么样
// 能加快webpack识别loader的速度,不用的话会构建项目的时间慢一点

// 高级 include / exclude 能干嘛,不写会怎么样
// 会把不需要处理的文件再次处理一遍,比如balel/eslint处理第三方库文件

// 高级 缓存: 需要开启那些缓存,为什么要开启?
// 因为webpack处理css/img文件都比较快,在js处理的时候花掉绝大多数时间,而处理js的就是babel/eslint/所以要开启babel/eslint缓存加快构建/打包速度

// 高级 多线程打包
// 处理js的,其实不止有baabel/eslint还有一个terser工具,它是压缩js代码的,所以要提升babel/eslint/terser的打包js的速度,这三个都要配置一遍

// 你可以说一下生产和开发有什么区别?
// 生产需要优化打的包速度,
// 
// 1.还有css兼容性,
// 2.开启缓存减少后续打包时间,
// 3.关闭HMR(默认开启的,会减慢打包速度),
// 4.js是压缩的如果遇到错误需要定位到第几行,第几列,需要开启suormap
// 开发需要优化构建项目速度
// 5.不需要打包第三方库,所以要用到include/exclude

// 开发需要注意构建速度,
// 1.开启balel/eslint缓存提升构建速度
// 2.开启souremap,需要定位到具体多少行,不需要开启多少列
````
