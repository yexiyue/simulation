import '../src/arrayMethods'
import {test,expect} from 'vitest'

test('simulation map',()=>{
  let arr=[1,2,3,4,5,6]
  expect(arr.mymap((item,i,arr)=>{
    console.log(item,i,arr)
    return item*2
  })).toEqual(arr.map((item,i)=>{
    return item*2
  }))
})

test('simulation find',()=>{
  let arr=[1,2,3,4,5,6]
  expect(arr.myfind((item,i,arr)=>{
    console.log(item,i,arr)
    return item>=5
  })).toEqual(arr.find((item,i)=>{
    return item>=5
  }))
})

test('simulation filter',()=>{
  let arr=[1,2,3,4,5,6]
  expect(arr.myfilter((item,i,arr)=>{
    console.log(item,i,arr)
    return item>=5
  })).toEqual(arr.filter((item,i)=>{
    return item>=5
  }))
})

test('simulation some',()=>{
  let arr=[1,2,3,4,5,6]
  expect(arr.mysome((item,i,arr)=>{
    console.log(item,i,arr)
    return item>=7
  })).toEqual(arr.some((item,i)=>{
    return item>=7
  }))

  expect(arr.mysome((item,i,arr)=>{
    console.log(item,i,arr)
    return item>2
  })).toEqual(arr.some((item,i)=>{
    return item>2
  }))
})

test('simulation every',()=>{
  let arr=[1,2,3,4,5,6]
  expect(arr.myevery((item,i,arr)=>{
    console.log(item,i,arr)
    return item>=7
  })).toEqual(arr.every((item,i)=>{
    return item>=7
  }))

  expect(arr.myevery((item,i,arr)=>{
    console.log(item,i,arr)
    return item>2
  })).toEqual(arr.every((item,i)=>{
    return item>2
  }))
})

test('simulation reduce',()=>{
  let arr=[1,2,3,4,5,6]
  expect(arr.myreduce((pre,cur,i,arr)=>{
    console.log(pre,cur,i,arr)
    return pre+cur
  })).toBe(arr.reduce((pre,cur)=>{
    return pre+cur
  }))

  expect(arr.myreduce((pre,cur)=>{
    pre[cur]=cur
    return pre
  },{})).toEqual(arr.reduce((pre,cur)=>{
    pre[cur]=cur
    return pre
  },{}))
})

test('simulation findIndex',()=>{
  let arr=[1,2,3,4,5,6]
  expect(arr.myfindIndex((item,i,arr)=>{
    console.log(item,i,arr)
    return item>=5
  })).toEqual(arr.findIndex((item,i)=>{
    return item>=5
  }))

  expect(arr.myfindIndex((item,i,arr)=>{
    console.log(item,i,arr)
    return item>=9
  })).toEqual(-1)
})

test('simulation concat',()=>{
  let arr=[1,2,3,4,5,6]
  let arr1=['a','b']
  expect(arr.myconcat(arr1)).toEqual([1,2,3,4,5,6,'a','b'])
  expect(arr.myconcat()).toEqual([1,2,3,4,5,6])
  expect(arr.myconcat('c',arr1,'123')).toEqual([1,2,3,4,5,6,'c','a','b','123'])
})