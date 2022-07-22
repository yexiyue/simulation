import {test,expect} from 'vitest'
import {myTypeof} from '../src/typeof'

test('test myTypeof simulation typeof',()=>{
  expect(myTypeof([1,2,3])).toBe('Array')
  expect(myTypeof({})).toBe('Object')
  expect(myTypeof(function(){})).toBe('function')
  expect(myTypeof(new String('12'))).toBe('String')
  expect(myTypeof(/\w\d/gim)).toBe('RegExp')
  expect(myTypeof(1)).toBe('number')
  expect(myTypeof(new Date())).toBe('Date')
})