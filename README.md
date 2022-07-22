# 手写源码

## 1.new

```typescript
//手写new
/**
 * new 一个构造函数有以下4个步骤
 * 1.新建一个对象也就是实例
 * 2.把该对象的隐式原型指向构造函数的显示原型
 * 3.改变构造函数的this指向，指向当前对象（实例）
 * 4.判断返回值
 * 
 */
export function create<T extends (...args:any)=>any>(fn:T,...args:Parameters<T>){
  //1.新建对象
  const obj=Object.create({})
  //2.把该对象的原型指向构造函数的原型
  Object.setPrototypeOf(obj,fn.prototype)
  //3.修改this指向
  const res:unknown=fn.apply(obj,args)
  //4.判断
  return res instanceof Object ?res:obj
}
```

## 2.用ES5实现继承

**寄生组合式继承**

```js
export function Person(name,age){
  this.name=name
  this.age=age
}

Person.prototype.eat=()=>{
  return 'eating'
}

export function Student(name,age,c){
  Person.call(this,name,age)
  this.class=c
}
//以父类的原型作为原型创建对象
Student.prototype=Object.create(Person.prototype)
//设定Constructor属性指向当前构造函数
Student.prototype.constructor=Student

//也可以这样
//Object.setPrototypeOf(Student.prototype,Person.prototype)

Student.prototype.eat=()=>{
  return 'student eating'
}
```

## 3.instanceof

```typescript
//判断一个对象是否是某个类的实例
export function myInstanceof(instance,className){
  let fp=className.prototype
  let cp=Object.getPrototypeOf(instance)
  while(cp){
    if(cp===fp){
      return true
    }
    //一层一层往上找隐式原型
    cp=Object.getPrototypeOf(cp)
  }
  return false
}
```

## 4.call

```typescript
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
```

## 5.apply

```typescript
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
  
  if(!args){
    res=ctx.__fn__()
  }else if(typeof args!=='object'){
    throw new Error('请传入数组')
  }else if(Array.isArray(args)){
    res=ctx.__fn__(...args)
  }
  //删除添加的函数
  delete ctx.__proto__.__fn__
  return res
}
```



## 6.bind

1. **bind可以分离函数的参数**

   ​	**bind接收部分参数返回的新函数接收一部分参数**

2. **bind&call的函数参数传递是 样的**

3. **实例化返回的新函数-> this指向是原来函数的实例**

```typescript
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
```



## 7.typeof

```typescript
export function myTypeof(value:unknown){
  if(value==null){
    return null
  }
  let type=typeof value
  if(type!=='object'){
    return type
  }
  let str=Object.prototype.toString.call(value)
  return (str.match(/\s(.*)]$/)as any)[1]
}

```



## 8.常用数组方法模拟

```typescript
Array.prototype.mymap=function(fn){
  let resList:any[]=[]
  for(let i=0;i<this.length;i++){
    resList.push(fn(this[i],i,this))
  }
  return resList
}

Array.prototype.myfind=function(fn){
  for(let i=0;i<this.length;i++){
    if(fn(this[i],i,this)){
      return this[i]
    }
  }
}

Array.prototype.myfilter=function(fn){
  let res:any[]=[]
  for(let i=0;i<this.length;i++){
    if(fn(this[i],i,this)){
      res.push(this[i])
    }
  }
  return res
}

Array.prototype.mysome=function(fn){
  for(let i=0;i<this.length;i++){
    if(fn(this[i],i,this)){
      return true
    }
  }
  return false
}

Array.prototype.myevery=function(fn){
  for(let i=0;i<this.length;i++){
    if(!fn(this[i],i,this)){
      return false
    }
  }
  return true
}

Array.prototype.myreduce=function(fn,pre){
  let flag=pre?true:false
  pre=pre?pre:this[0]
  for(let i=flag?0:1;i<this.length;i++){
    pre=fn(pre,this[i],i,this)
  }
  return pre
}

Array.prototype.myfindIndex=function(fn){
  for(let i=0;i<this.length;i++){
    if(fn(this[i],i,this)){
      return i
    }
  }
  return -1
}

Array.prototype.myconcat=function(...args){
  let res:any[]=[]
  if(!args){
    res.push(...this)
    return res
  }
  res.push(...this)
  args.forEach((item)=>{
    if(Array.isArray(item)){
      res.push(...item)
    }else{
      res.push(item)
    }
  })
  return res
}
```

