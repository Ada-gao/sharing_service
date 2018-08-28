import axios from 'axios';//引入axios

export function fetch(options){
    return new Promise((resolve, reject) => {
      const instance = axios.create({  //instance创建一个axios实例，可以自定义配置，可在 axios文档中查看详情
        //所有的请求都会带上这些配置，比如全局都要用的身份信息等。
        headers: {
          'content-type':'application/json',
          // 'token_in_header': global_.token,//token从全局变量那里传过来
          'AppID':'9d2c1e18b0bc408da8624cce97bb74a2',
          'AppSecret':'14dbefefb0004eb890fc7d1b1a467290'
        },
        // timeout:5000,// 30秒超时
      });
      instance(options)
        .then(response => { //then 请求成功之后进行什么操作
          resolve(response);//把请求到的数据发到引用请求的地方
        })
        .catch(error => {
          console.log('请求异常信息：'+error);
          reject(error);
        });
    });
}
