const model = require('../models/index')
const { field, table } = require('../config/index')
const getCategory = () => {
  return model.query(table.category, field.category)
}

const getCategoryProduct = (options, page = 0, size = 10, order = {}) => {
  options.product_status = 0
  order.name = 'creat_time'
  order.orderBy = 'asc'
  return model.query(table.product, field.product, options, page, size, order)
}

const getCategoryProductCount = (options) => {
  return model.count(table.product, options)
}

module.exports = {
  getCategory,
  getCategoryProduct,
  getCategoryProductCount
}
