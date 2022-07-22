interface Function{
  myapply(thisArg?:unknown,args?:any[]):any
}

Function.prototype.myapply=function(thisArg,args){
  //先处理一下this对象
  let ctx=thisArg ?Object(thisArg):globalThis
  //设置原型属性为被调用的函数
  ctx.__proto__.__fn__=this;
  //保存结果
  let res
  
  if(!args || typeof args=='function'){
    res=ctx.__fn__()
  }else if(typeof args!=='object' && typeof args!=='function'){
    throw new Error('请传入数组')
  }else if(Array.isArray(args)){
    res=ctx.__fn__(...args)
  }
  //删除添加的函数
  delete ctx.__proto__.__fn__
  return res
}