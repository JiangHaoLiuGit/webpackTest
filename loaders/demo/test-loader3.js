module.exports = function (content){
    // 他返回的是一个二进制,通常处理图片/html文件的
    console.log(content);
    return content
}
module.exports.raw = true