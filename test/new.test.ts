import {test,expect} from 'vitest'
import {create} from '../src/new'

test('simulation <new> operator',()=>{
  function Fun(name:string,age:number){
    this.name=name
    this.age=age
  }
  Fun.prototype.eat=()=>{
    return 'i am eating...'
  }
  let obj=create(Fun,'张三',18)
  expect(obj).toEqual({
    name:'张三',
    age:18
  })
  expect(obj.eat()).toMatch(/^i am eating\.\.\.$/)
})