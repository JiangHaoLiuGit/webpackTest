console.log("hello webpack")
let num = 999;
console.log("hello 11")
console.log("hello 22")

const sum = (...arg) => {
    return arg.reduce((n,p) => n + p,0)
}

console.log(sum(1,2,3,4,5))