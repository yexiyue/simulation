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