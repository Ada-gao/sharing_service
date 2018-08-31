import {
  MessageBox,
} from 'mint-ui';

export function set(name,val){
  window.localStorage.setItem(name, JSON.stringify(val));
}
export function get(name){
  return window.localStorage.getItem(name);
}

export function sett(key,value){
        var curTime = new Date().getTime();
        window.localStorage.setItem(key,JSON.stringify({data:value,time:curTime}));
}
export function gett(key,exp){
        var data = window.localStorage.getItem(key);
        var dataObj = JSON.parse(data);
        // exp默认一周
        var exp = exp || 1000 * 60 * 60 * 24 * 7;
        if(!dataObj){
            console.log('错误')
        }else if(key == 'token'){
            if (new Date().getTime() - dataObj.time>exp) {
             window.localStorage.removeItem(key);
             MessageBox('登录信息已过期，请重新登录')
           }else{
             return dataObj.data;
           }
         }else{
             return dataObj.data;
           }
         // }else if(key == 'id_front_url' || key == 'id_back_url'){
         //   if (new Date().getTime() - dataObj.time>exp) {
         //    window.localStorage.removeItem(key);
         //    MessageBox('图片信息已过期，请重新上传')
         //  }else{
         //    return dataObj.data;
         //  }
         // }

        // if(!dataObj){
        //     console.log('111')
        // }else if (new Date().getTime() - dataObj.time>exp) {
        //   window.localStorage.removeItem(key);
        // }else{
        //     return dataObj.data;
        // }
}

export function fmtDate(obj){
    var date =  new Date(obj);
    var y = 1900+date.getYear();
    var m = "0"+(date.getMonth()+1);
    var d = "0"+date.getDate();
    return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
}
// xxxx年xx月xx日 xx:xx
export function timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '年';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
        var D = date.getDate() + '日' + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes();
        // var s = date.getSeconds();
        return Y+M+D+h+m;
    }

export function timetap(time){
  return new Date(time).getTime()
}
