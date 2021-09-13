import { CloudRequest } from '../utils/request'
class Category extends CloudRequest {
  getCategoryProduct (options, page, size) {
    return this.request({
      url: 'getCategoryProduct',
      data: {
        options,
        page,
        size
      }
    })
  }
}
export {
  Category
}
