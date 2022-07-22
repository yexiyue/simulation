import '../src/call'
import {test,expect} from 'vitest'

test('simulation call',()=>{
  let obj = {
    name: '张三',
  }
  function sum(a, b) {
    return a + b
  }
  function sum1() {
    return this
  }
  expect(sum.mycall(obj,1,2)).toBe(3)
  expect(sum1.mycall(obj)).toEqual(obj)
  expect(sum1.call(null)).toBe(sum1.call(null))
})