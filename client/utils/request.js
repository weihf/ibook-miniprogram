import { config } from '../config/index'
class CloudRequest {
  constructor  () {
    this.route = config.route
  }

  request (params) {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: this.route,
        data: {
          $url: params.url,
          data: params.data
        },
        success: res => {
          resolve(res)
        },
        fail: err => {
          reject(err)
        }
      })
    })
  }
}
export {

  CloudRequest
}
