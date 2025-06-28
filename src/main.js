import {num} from './js/num'
import './css/iconfont.css'
import './css/style/style.css'
import './css/less/index.less'
import './css/sass/index.sass'
import './css/sass/index.scss'
import './css/stylus/index.styl'

document.getElementById("computedBtn").onclick = function(){
    import('./js/count').then(({count})=>{
        console.log(count(6,2))
    })
}

let nums = num(1,3,6,8)
console.log(nums)

if(module.hot){
    //判断是否支持HMR,把count.js添加
    module.hot.accept("./js/count");
    module.hot.accept("./js/num");
}
