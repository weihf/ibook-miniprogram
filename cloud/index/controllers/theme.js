const model = require('../models/index')
const { field, table } = require('../config/index')

const getTheme = () => {
  return model.query(table.theme, field.theme)
}

const getThemeProduct = (options, page = 0, size = 10, order = {}) => {
  options.product_status = 0
  order.name = 'creat_time'
  order.orderBy = 'asc'
  return model.query(table.product, field.product, options, page, size, order)
}

const getThemeProductCount = (options) => {
  return model.count(table.product, options)
}

module.exports = {
  getTheme,
  getThemeProduct,
  getThemeProductCount
}
