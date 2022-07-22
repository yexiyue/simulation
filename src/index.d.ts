declare interface Array{
  mymap(fn:(item,i:number,array:Array<any>)=>any):any[];
  myfind(fn:(item,i:number,array:Array<any>)=>boolean):any;
  myfilter(fn:(item,i:number,array:Array<any>)=>boolean):any[];
  mysome(fn:(item,i:number,array:Array<any>)=>boolean):boolean;
  myevery(fn:(item,i:number,array:Array<any>)=>boolean):boolean;
  myreduce(fn:(pre,cur,i:number,array:Array<any>)=>boolean,pre?:any):boolean;
  myfindIndex(fn:(item,i:number,array:Array<any>)=>boolean):number;
  myconcat(...args):any[];
}