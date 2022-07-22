//1.call改变this指向
//2.call执行函数
interface Function {
  mycall(context?: unknown, ...args: any): any
}

Function.prototype.mycall = function (context, ...args) {
  let ctx = context ? Object(context) : globalThis
  //谁调用的mycall this就是谁
  ctx.__proto__.__fn__=this
  //通过ctx调用函数
  let res=ctx.__fn__(...args)
  //删除无故添加的属性
  delete ctx.__proto__.__fn__
  return res
}
