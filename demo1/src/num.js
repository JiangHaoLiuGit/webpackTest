export function nums(...arg){
    return arg.reduce((n,val) => n+val,0)
}