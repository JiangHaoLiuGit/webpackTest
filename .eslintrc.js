module.exports = {
    extends:["eslint:recommended"],
    env:{
        node:true,//启用node中的全局变量
        browser:true,//启用浏览器中全局变量
    },
    parserOptions:{
        ecmaVersion:6,//es6
        sourceType:"module",//es module
    },
    rules:{
        "no-var":2,//不能用 var来定义变量
    },
    parser: '@babel/eslint-parser',
    parserOptions: {
        requireConfigFile: false,
        babelOptions: {
            presets: ['@babel/preset-env']
        }
    },
    globals:{
        "Promise":"readonly"
    }
}