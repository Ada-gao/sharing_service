import {
  MessageBox,
} from 'mint-ui';
// 启用app
export default function runApp(schemaUrl) {
    let t0 = (new Date()).getTime(),
        href = ''
    // 判断是微信
    if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
      MessageBox('点击右上角按钮，选择在浏览器打开，即可打开app')
      return
    }
    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
      href = schemaUrl.ios;
    } else {
      href = schemaUrl.android;
    }
    window.location.href = href
    // var delay = setInterval(function () {
    //   var t1 = (new Date()).getTime();
    //   if (t1 - t0 < 4000 && t1 - t0 > 3000) {
    //     window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.tanbei.biqiu";
    //   }
    //   if (t1 - t0 >= 4000) {
    //     clearInterval(delay);
    //   }
    // }, 1000);
}
