import { CloudRequest } from '../utils/request'
class Product extends CloudRequest {
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

  getProductById (options) {
    return this.request({
      url: 'getProductById',
      data: {
        options
      }
    })
  }
}

export {
  Product
}
