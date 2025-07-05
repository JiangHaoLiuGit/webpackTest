const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry:"./src/main.js",
    output:{
        path:path.resolve(__dirname,"./dist"),
        filename:"js/[name].js",
        clean:true,
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                // loader:"./loaders/test-loader.js"
                // use:["./loaders/demo/test-loader1.js","./loaders/demo/test-loader2.js"]
                // use:["./loaders/demo/test-loader3.js"]
                use:["./loaders/demo/test-loader4.js","./loaders/demo/test-loader5.js","./loaders/demo/test-loader6.js"]
            }
        ]
    },
    plugins:[
        new HTMLWebpackPlugin({
            template:path.resolve(__dirname,"./public/index.html")
        })
    ],
    mode:"development"
}