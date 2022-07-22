Array.prototype.mymap=function(fn){
  let resList:any[]=[]
  for(let i=0;i<this.length;i++){
    resList.push(fn(this[i],i,this))
  }
  return resList
}

Array.prototype.myfind=function(fn){
  for(let i=0;i<this.length;i++){
    if(fn(this[i],i,this)){
      return this[i]
    }
  }
}

Array.prototype.myfilter=function(fn){
  let res:any[]=[]
  for(let i=0;i<this.length;i++){
    if(fn(this[i],i,this)){
      res.push(this[i])
    }
  }
  return res
}

Array.prototype.mysome=function(fn){
  for(let i=0;i<this.length;i++){
    if(fn(this[i],i,this)){
      return true
    }
  }
  return false
}

Array.prototype.myevery=function(fn){
  for(let i=0;i<this.length;i++){
    if(!fn(this[i],i,this)){
      return false
    }
  }
  return true
}

Array.prototype.myreduce=function(fn,pre){
  let flag=pre?true:false
  pre=pre?pre:this[0]
  for(let i=flag?0:1;i<this.length;i++){
    pre=fn(pre,this[i],i,this)
  }
  return pre
}

Array.prototype.myfindIndex=function(fn){
  for(let i=0;i<this.length;i++){
    if(fn(this[i],i,this)){
      return i
    }
  }
  return -1
}

Array.prototype.myconcat=function(...args){
  let res:any[]=[]
  if(!args){
    res.push(...this)
    return res
  }
  res.push(...this)
  args.forEach((item)=>{
    if(Array.isArray(item)){
      res.push(...item)
    }else{
      res.push(item)
    }
  })
  return res
}