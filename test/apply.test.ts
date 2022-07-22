import '../src/apply'
import {test,expect} from 'vitest'

test('simulation apply',()=>{
  let obj = {
    name: '张三',
  }
  function sum(a, b) {
    return a + b
  }
  function sum1() {
    return this
  }
  expect(sum.myapply(obj,[1,2])).toBe(3)
  expect(sum1.myapply(obj)).toEqual(obj)
  expect(sum1.myapply(null)).toBe(sum1.call(globalThis))
  //@ts-ignore
  expect(sum1.myapply(obj,function(){})).toEqual(obj)
  //@ts-ignore
  expect(()=>sum.myapply(obj,2)).toThrow(/请传入数组/)
})