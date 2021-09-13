const model = require('../models/index')
const { field, table } = require('../config/index')
const getBanner = () => {
  return model.query(table.banner, field.banner)
}
module.exports = {
  getBanner
}
