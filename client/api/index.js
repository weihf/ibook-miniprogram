import { CloudRequest } from '../utils/request'
class Index extends CloudRequest {
  // 首页
  getBanner () {
    return this.request({
      url: 'getBanner'
    })
  }

  getTheme () {
    return this.request({
      url: 'getTheme'
    })
  }

  getBestseller () {
    return this.request({
      url: 'getBestseller'
    })
  }

  // 分类
  getCategory () {
    return this.request({
      url: 'getCategory'
    })
  }
}
export {
  Index
}
