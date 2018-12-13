const app = getApp();
const headerConfig = {
  "Content-Type": "application/json",
  'openid': wx.getStorageSync('openid')
}
getOpenid();
export function getOpenid () {
  if(!headerConfig.openid) {
    wxPromise(wx.login)()
    .then(res => get("/auth/getOpenid", {jscode: res.code})
    .then(res => {
        const openid = JSON.parse(res.data.retobj).openid;
        // 保存openid到本地
        wx.setStorageSync("openid", openid);
        headerConfig.openid = openid;
      })
    )
  }
}

export function wxPromise(fn) {
  return function(obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = res => {
        resolve(res)
      };
      obj.fail = res => {
        reject(res)
      };
      fn(obj)
    })
  }
}
export function post(url, data={}){
  return new Promise((resolve, reject) => {
     //网络请求
     wx.request({
        url: app.globalData.url + url,
        data,
        method: 'POST',
        header:headerConfig,
        success: function (res) {//服务器返回数据
          resolve(res);
        },
        fail: function (error) {
          reject(error);
        }
     })
  });
}
export function get(url, data={}){
  return new Promise((resolve, reject) => {
     //网络请求
     wx.request({
        url: app.globalData.url + url,
        data,
        method: 'GET',
        header:headerConfig,
        success: function (res) {//服务器返回数据
          resolve(res);
        },
        fail: function (error) {
           reject(error);
        }
     })
  });
}