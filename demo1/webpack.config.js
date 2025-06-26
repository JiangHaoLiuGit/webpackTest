const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    // entry:"./src/main.js"//只有一个文件入口,单入口
    // 这个是多入口写法
    entry: {
        app: "./src/app.js",
        main: "./src/main.js"
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html")
        })
    ],
    mode: "production",
}