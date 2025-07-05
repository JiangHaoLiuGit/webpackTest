// 异步loader 只有异步函数callback调用了才算结束
module.exports = function(content,map,meta){
    let callback = this.async()
    setTimeout(() => {
        console.log("content async");
        callback(null,content,map,meta)
    },1000)
}