// 同步loader
module.exports = function(content,map,meta){
    console.log("content 同步");
    let err = null
    // 第一个是报错信息
    this.callback(err,content,map,meta)
}