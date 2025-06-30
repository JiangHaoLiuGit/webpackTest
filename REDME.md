````js
//loader 使用 => 如果不熟悉推荐去官方文档中找 https://webpack.docschina.org/loaders/ 官方文档找不到的话，可以从社区 Github 中搜索查询
// webpack 能处理js文件所以打包不用引入loader,如果要处理其他的非js文件,比如css,那就要配置loader文件
// 处理css 需要的loader
// css-loader 将css编译成webpack能识别的模块
// style-loader 创建一个style标签,里面放置的是webpack处理后的css模块内容
// less-loader webpack处理less文件
// sass-loader webpack处理sass/scss文件
// stylus-loader webpack处理.styl文件
// 处理图片资源 搜索 type:"asset" 小于 xxMb的图片将会被打包成base 64位,可以减少小图片的请求次数
// 修改图片输出目录 配置filename属性
// 自动清空上次打包内容 webpack4 要用html-webpack-plugin 在webpack5中只需要在output中配置 clean:true就可以了
// 处理字体文件 配置 test 正则匹配 类型 type:"asset" filename配置打包出口文件夹
// 处理js文件 因为现在打包的js,比如es6的箭头函数,promise打包出来仍然是js6语法,有些浏览器不认识es6,比如ie浏览器,这种代码放到ie浏览器直接白屏,客户要骂娘了,至少要兼容ie11吧,所以得进一步打包配置
// 为什么要引入eslint ,eslint能干嘛,用的时候该怎么用
// babel 为什么引入 处理文件是babelrc.js有的时候是babel.config.js,有什么时候都存在?这应该是版本问题,不同版本配置文件不同
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

// 为什么要把css单独打包,现在就这样不好吗,为什么    css-minimizer-webpack
// 因为他会把css打包到js文件中去,运行js文件的同时会解析css,生成style标签生效css属性,如果网速慢就会闪屏

// css 兼容性怎么处理,如果要写ie >= 8怎么做配置 postcss-loader
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
// 如何开启?
// js文件只处理src文件中的js => test:正则匹配.js文件下面直接写include:path.resolve(__dirname,'../src')
// esLint排除某文件 eslintWebPackPlugin下面直接配置exclude:"dist"

// 高级 缓存: 需要开启那些缓存,为什么要开启? 
// 因为webpack处理css/img文件都比较快,在js处理的时候花掉绝大多数时间,而处理js的就是babel/eslint/所以要开启babel/eslint缓存加快构建/打包速度
// 如何开启?
// babel-loader 和 eslintwebpackpulign可以开启缓存
// 先搜索babel-loader,在搜索关键字cache就能找到配置关键词
// eslintwebpackpulign在pulign中配置直接写cache:true即可开启缓存

// 高级 多线程打包 test: 正则匹配.js里面的use配置 thread-loader 开启多线程
// 处理js的,其实不止有baabel/eslint还有一个terser工具,它是压缩js代码的,所以要提升babel/eslint/terser的打包js的速度,这三个都要配置一遍

// 高级 TreeShaking 生产模式默认开启的,没有用到的代码不会打包,开发模式不需要开启,比如utils.js里面export 导出10个函数,文件只用了8个函数,所以生产打包的时候不会将剩余两个打包进去,他只会打包检测到用到的代码,可以减少打包体积,提升应用加载速度和运行时性能.

// 高级 减少babel产生的文件体积 @babel/plugin-transform-runtime
// Babel 为编译的每个文件都插入了辅助代码，使代码体积过大！
// Babel 对一些公共方法使用了非常小的辅助代码，比如 _extend。默认情况下会被添加到每一个需要它的文件中。
// @babel/plugin-transform-runtime: 禁用了 Babel 自动对每个文件的 runtime 注入，而是引入 @babel/plugin-transform-runtime 并且使所有辅助代码从这里引用。

// 高级 图片压缩 webpack官网搜imageminimizerWebpackPlugin(imagemini关键字)
// 场景:本地有很多图片可以引入,可以小幅度减小图片占用打包文件的体积

// 高级 codesplit 多入口 demo1
// 高级 codesplit 多入口提取公公模块 deme2
// 高级 codesplit 按需加载 多入口 deom3

// 高级 codesplit 单入口 代码分割 面试必问,就是两个原因,防止重复打包和动态引入解决页面加载慢的情况
// 做的好处 1.公共代码,比如node_moduels中的loadsh用到多次的公共方法会打包成一个文件,防止用到10次,打的包10次
// 2.动态导入文件,比如XXX场景下,比如点击或者XXX页面加载的时候才会执行import("../xxx.js").then(()=>{}),会把这些import打包成另外的.js等他执行到import的时候才会加载对应的js文件
// 这里有个elist报错,是由于高版本9.1版本报错报错 Parsing error: 'import' and 'export' may only appear at the top level
// 在eslint 7.1低版本中解决方式很简单在.eslintrc.js中增加plugins:["import"] 配置即可,
// 在eslint 9.1高版本中解决方式很复杂,需要安装eslint-import-resolver-webpack,在.eslintrc.js中增加plugins:["import"],settings:{'import/resolver':{webpack:{config:"webpack.config.js"}}}配置即可
//  起因 :出现的问题,9.1中舍弃了很多插件,导致新插件得重新安装,比如7.1版本用到的babel-eslint插件在9.1中这个插件已经启用了并且改名了,叫@babel/eslint-parser,所以9.1肯定会报错,安装@babel/eslint-parser 的同时babel的配置也更新了应该引入@babel/core @babel/preset-env @babel/plugin-transform-modules-commonjs插件,真是牵一发动全身啊,不过配置多是多,但是9.1功能比7.1多多了!!!.
// // 解决方案
// 安装 eslint插件 @babel/eslint-parser 
// 安装babel 插件 @babel/core @babel/preset-env @babel/plugin-transform-modules-commonjs
// 在.babel.config.js中增加
// presets: [
//     ["@babel/preset-env", {
//       "modules": false,
//       "useBuiltIns": "usage",
//       "corejs": 3
//     }]
// ],
// plugins: ["@babel/plugin-transform-modules-commonjs"]
// 在.eslintrc.js增加
// parser: '@babel/eslint-parser',
// parserOptions: {
//     requireConfigFile: false,
//     babelOptions: {
//         presets: ['@babel/preset-env']
//     }
// }

// 高级 splitChunks 给代码分割模块命名
// webpack注释魔法命名 /*webpackChunkname: "xxxx"*/

// 高级 splitChunks 给打包文件统一整体命名

// 高级 PreLoad和PreFetch
// 都可以在浏览器空闲时间加载代码分割部分,比如import懒加载的文件,不用等到了那个页面才加载资源,如果import页面资源太多,避免会造成卡顿
// 区别:
// PreLoad:加载优先级高,PreFetch低
// PreLoad:加载当前页面资源,PreFetch:加载其他页面资源
// 缺点,api浏览器兼容性差,可以去caniuse.com查询前端api的浏览器版本支持情况
// 你可以看出来preLoad在IE下完全不支持，preFetch在IE11可以用，而且这个插件已经不维护了
// 所以换插件，换vue团队的插件，他们在维护@vue/preload-webpack-plugin 如果不知道怎么用@vue/preload-webpack-plugin插件可以去npmjs.com去康康
// 结果,打包的文件会自动引入<link href="static/js/math.chunk.js" rel="prefetch"> 会在浏览器空闲时间加载(实现方式,浏览器会把他的渲染优先级设置为Lowest比较低的渲染优先级)



// 面试官:相对路径和绝对路径有什么区别?
// 绝对路径 => 
// <a href="/user/index.text"></a> 绝对路径写法(省略协议,域名,端口)
// 生产环境(https://jujiao.com/) => https://jujiao.com/user/index.html 
// 开发环境(http://localhost:3000) => http://localhost:3000/user/index.html

// <a href="://jujiao.com/user/index.text"></a>
// 生产环境(https 加密) => https://jujiao.com/user/index.text
// 开发环境(http) => http://jujiao.com/user/index.text

// 比如:http://a.com/a/b/c.html
// c.html中<a href="/1.js"></a>
// a的href会成为http://a.com/1.js和路径:a/b没有关系

// 相对路径 => http://a.com/a/b/c.html
// <a href="./1.js"></a> 或者 <a href="1.js"></a> => http://a.com/a/b/1.js
// <a href="../1.js"></a> => http://a.com/a/1.js

// webpack中的相对路径和绝对路径
// common.js环境
// 绝对路径
// path.resolve(from, to) 将参数to的位置解析到from中
// 举例:path.resolve("http://jujiao.com/a",./b/1.js) => http://jujiao.com/a/b/1.js
// 项目目录:
// src
// webpack.dev.js
// img
// js
//    user
//        index.jjs
// js/user/index.js中找src怎么找 => path.resolve(__dirname,"src")
// __dirname代表项目的根路径

// 相对路径
// js/user/index.js中找src怎么找 ../../src

// 如果是vue环境
// 绝对路径 @/src
// 相对路径 '../../src'


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
