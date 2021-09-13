const model = require('../models/index')
const { field, table } = require('../config/index')

const getProduct = (options, page = 0, size = 10, order = {}) => {
  options.product_status = 0
  order.name = 'creat_time'
  order.orderBy = 'asc'
  return model.query(table.product, field.product, options, page, size, order)
}

const getProductById = (id) => {
  return model.findById(table.product, field.product, id)
}

module.exports = {
  getProduct,
  getProductById
}
