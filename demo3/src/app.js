import {nums} from './num.js'
console.log("我是app")
console.log(nums(1,2,5))
import { counsJs } from './count.js'

document.getElementById("btn").onclick = function (){
    // import 动态导入,会将动态导入的文件代码分割(拆分成单独模块),在需要的时候自动加载
    import("./count.js")
    .then(res=>{
        console.log("模块加载成功",res.counsJs(10,6))
    }).catch(res=>{
        console.log("模块加载失败了",res)
    })
}
