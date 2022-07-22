import {test,expect} from 'vitest'
import {myInstanceof} from '../src/instanceof'
test('simulation <instanceof> operator',()=>{
  class A{}
  class B extends A{}
  let obj=new B()
  expect(myInstanceof(obj,A)).toBe(true)
})