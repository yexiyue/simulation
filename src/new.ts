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

class Fun{
  public name:string
  public age:number
  constructor(name:string,age:number){
    this.name=name
    this.age=age
  }
  eat(){
    return 'i am eating...'
  }
}

let obj=create(Fun.constructor as any,'张三',18)
console.log()