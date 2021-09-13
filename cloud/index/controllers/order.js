const model = require('../models/index')
const { table, field } = require('../config/index')

const createOrder = (orderData, openId) => {
  const orderdetails = []
  // 添加订单详情
  const createTime = new Date()
  const updateTime = new Date()
  for (const product of orderData.products) {
    const paramsOrderDetail = {
      product_id: product._id,
      product_name: product.product_name,
      product_price: product.product_sell_price,
      product_count: product.counts,
      product_img: product.product_img,
      create_time: createTime,
      update_time: updateTime
    }
    orderdetails.push(paramsOrderDetail)
  }
  // 订单信息
  const paramsOrder = {
    buyer_openid: openId,
    buyer_name: orderData.address.userName,
    buyer_phone: orderData.address.phone,
    buyer_address: orderData.address.detailAddress,
    order_amount: orderData.account,
    order_status: 0, // 默认未付款
    create_time: new Date(),
    update_time: new Date(),
    orderdetail: orderdetails
  }
  return model.add(table.order, paramsOrder)
}

const getOrderById = (orderId) => {
  return model.findById(table.order, field.order, orderId)
}

const getOrderList = (openId, page = 0, size = 10, order = {}) => {
  order.name = 'create_time'
  order.orderBy = 'desc'
  const options = { buyer_openid: openId }
  return model.query(table.order, field.order, options, page, size, order)
}

const getOrderListCount = (options) => {
  return model.count(table.order, options)
}

module.exports = {
  createOrder,
  getOrderById,
  getOrderList,
  getOrderListCount
}
