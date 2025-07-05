
/**
 * loader就是一个js函数
 * 当解析资源时,会调用相应的(test正则)loader去处理
 * loader接收到文件内容作为参数,返回内容出去
 *      content 文件内容
 *      map sourceMap
 *      meta 别的loader传递的数据
 */
module.exports = function(content,map,meta){
    content = content
    console.log(content)
    return content;
}