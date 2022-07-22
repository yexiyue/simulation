interface Function{
  myBind(context,...args):any
}
Function.prototype.myBind=function(ctx){
  let _self=this
  let args1=[].slice.call(arguments,1)
  const _tempFn=function(){}
  const newFn= function(){
    let args2=[].slice.call(arguments)
    //判断是不是new调用，如果是绑定this否则返回ctx
    return _self.apply(this instanceof newFn?this:ctx,args1.concat(args2))
  }
  //以原函数的原型创建一个新对象做为newFn的原型
  _tempFn.prototype=this.prototype
  newFn.prototype=new _tempFn()
  //指定原型构造器属性
  newFn.prototype.constructor=this
  //newFn.prototype.__proto__=this.prototype 变相继承
  //相当于
  /* newFn.prototype=Object.create(this.prototype) */
  
  return newFn
}