export function set(name,val){
  window.localStorage.setItem(name, JSON.stringify(val));
}
export function get(name){
  return window.localStorage.getItem(name);
}

export function fmtDate(obj){
    var date =  new Date(obj);
    var y = 1900+date.getYear();
    var m = "0"+(date.getMonth()+1);
    var d = "0"+date.getDate();
    return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
}
