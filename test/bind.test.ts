import '../src/bind'
import {test,expect} from 'vitest'

test('simulation bind',()=>{
  let obj = {
    name: '张三',
  }
  function getName(){
    return this.name
  }
  function user(a,b){
    this.a=a
    this.b=b
  }
  let fn1=getName.bind(obj)
  let fn2=user.bind(obj,1)

  expect(fn1()).toBe('张三')
  expect(new fn2(2)).toEqual({
    a:1,
    b:2
  })
})