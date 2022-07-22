import {test,expect} from 'vitest'
import {Student,Person} from '../src/extends'
test('simulation class extends',()=>{
  let obj=new Student('张三',18,2)
  expect(obj).toEqual({
    name:'张三',
    age:18,
    class:2
  })

  expect(obj.eat()).toBe('student eating')
  expect(obj instanceof Student).toBe(true)
  expect(obj instanceof Person).toBe(true)
})