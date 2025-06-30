import {num} from './js/num'
import {count} from './js/count'
import './css/iconfont.css'
import './css/style/style.css'
import './css/less/index.less'
import './css/sass/index.sass'
import './css/sass/index.scss'
import './css/stylus/index.styl'
// 全部引入
// import "core-js"
// 引入部分功能
// import 'core-js/es6/promise'

document.getElementById("computedBtn").onclick = function(){
    // /*webpackChunkName: "math" */ webpack 魔法命名
    import(/*webpackChunkName: "math" */'./js/math').then(({mul})=>{
        console.log(mul(6,2))
    })
}

let nums = num(1,3,6,8)
console.log(nums)
console.log(count(10,5))

if(module.hot){
    //判断是否支持HMR,把count.js添加
    module.hot.accept("./js/count");
    module.hot.accept("./js/num");
}

let magess = new Promise(function (resolve) {
    setTimeout(() =>{
        resolve("hello 你好")
    })
})

magess.then((res) => {
    console.log("res:"+res)
})
let arr = [2,5,7,9]
console.log(arr.includes(5))

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
}