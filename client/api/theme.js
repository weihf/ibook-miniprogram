import { CloudRequest } from '../utils/request'
class Theme extends CloudRequest {
  getThemeProduct (options, page, size) {
    return this.request({
      url: 'getThemeProduct',
      data: {
        options,
        page,
        size
      }
    })
  }
}
export {
  Theme
}
