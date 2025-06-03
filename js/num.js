export function num(...arg){
    return arg.reduce((n,preV) => n + preV,0)
}