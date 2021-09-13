import { CloudRequest } from '../utils/request'
class Order extends CloudRequest {
  creatOrder (orderData) {
    return this.request({
      url: 'creatOrder',
      data: {
        orderData
      }
    })
  }

  getOrderById (id) {
    return this.request({
      url: 'getOrderById',
      data: {
        id
      }
    })
  }

  getOrderList (page, size) {
    return this.request({
      url: 'getOrderList',
      data: {
        page,
        size
      }
    })
  }
}

export {
  Order
}
