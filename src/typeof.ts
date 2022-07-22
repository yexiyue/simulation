export function myTypeof(value:unknown){
  if(value==null){
    return null
  }
  let type=typeof value
  if(type!=='object'){
    return type
  }
  let str=Object.prototype.toString.call(value)
  return (str.match(/\s(.*)]$/)as any)[1]
}
