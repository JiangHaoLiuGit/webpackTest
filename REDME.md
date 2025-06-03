````js
//创建packeage.json 依赖
npm init -y

//安装依赖
npm i webpack webpack-cli -D

//npx ... npx可以运行node_module > .bin里面的指定程序
// development开发模式
// production生产模式
// 没有webpack配置文件(webpack.config.js)可以这么打包
npx webpack ./src/main.js --mode=development

// common.js规范
// __dirname 处理绝对路径
// __filename 处理相对路径
// exports
// module
// require()


// 配置完了webpack可以这么打包
npx webpack
````