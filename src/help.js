import {
  MessageBox,
} from 'mint-ui';

export function set(name, val) {
  window.localStorage.setItem(name, JSON.stringify(val));
}
export function get(name) {
  return window.localStorage.getItem(name);
}

export function sett(key, value) {
  var curTime = new Date().getTime();
  window.localStorage.setItem(key, JSON.stringify({
    data: value,
    time: curTime
  }));
}
export function gett(key, exp) {
  var data = window.localStorage.getItem(key);
  var dataObj = JSON.parse(data);
  // exp默认一周
  var exp = exp || 1000 * 60 * 60 * 24;
  if (!dataObj) {
    console.log(' ')
  } else if (key == 'token') {
    if (new Date().getTime() - dataObj.time > exp) {
      window.localStorage.removeItem(key);
    } else {
      return dataObj.data;
    }
  } else {
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

export function fmtDate(obj) {
  var date = new Date(obj);
  var y = 1900 + date.getYear();
  var m = "0" + (date.getMonth() + 1);
  var d = "0" + date.getDate();
  return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
}
// xxxx年xx月xx日 xx:xx
export function timestampToTime(timestamp) {
  var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '年';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
  var D = date.getDate() + '日' + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes();
  // var s = date.getSeconds();
  return Y + M + D + h + m;
}

// xxxx年xx月xx日 xx:xx
export function timetampToTime(timetamp) {
  var date = new Date(timetamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '.';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
  var D = (date.getDate() + 1 < 10 ? '0' + (date.getDate() + 1) : date.getDate() + 1) + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes();
  // var s = date.getSeconds();
  return Y + M + D + (h < 10 ? "0" + h : h) + (m < 10 ? "0" + m : m);
}

export function timetap(time) {
  return new Date(time).getTime()
}

// url参数匹配
export function getUrlParams(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var url = window.location.hash.split('?')[1]
  var r = url.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

// url参数匹配(全)
export function getParameterByName(paramName) {
  var args = new Object();
  var argsStr = window.location.hash.split('?')[1]; //获取URL参数字符串
  if (argsStr) {
    // argsStr = argsStr.substr(0);
    var nameValueArr = argsStr.split("&"); //多参数
    for (var i = 0; i < nameValueArr.length; i++) {
      var pos = nameValueArr[i].indexOf('=');
      if (pos == -1) continue; //如果没有找到就跳过
      var argName = nameValueArr[i].substring(0, pos); //提取name
      var argVal = nameValueArr[i].substring(pos + 1); //提取value
      args[argName] = unescape(argVal);
    }
    return args[paramName];
  }
}