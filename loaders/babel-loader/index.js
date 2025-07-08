const schema = require("./schema.json")
const babel = require("@babel/core")

module.exports = function (content){
    const callback = this.async()
    const options = this.getOptions(schema)
    // 使用babel
    babel.transform(content,options,function(err,result){
        if(err) callback(err)
        else callback(null,result.code)
    })
}