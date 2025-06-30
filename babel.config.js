module.exports = {
    presets: [
        ["@babel/preset-env", {
            modules: false,
            useBuiltIns: "usage",//core.js 按需加载自动引入
            corejs: 3, //core.js 的版本
        }]
    ],
    plugins: [
        "@babel/plugin-transform-modules-commonjs"
    ]
}