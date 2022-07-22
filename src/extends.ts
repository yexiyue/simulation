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
