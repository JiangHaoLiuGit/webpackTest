module.exports = function (content){
    // 他返回的是一个二进制,通常处理图片/html文件的
    console.log("content5 normal");
}
module.exports.pitch = function (content){
    // 他返回的是一个二进制,通常处理图片/html文件的
    console.log("content5 pitch");
}