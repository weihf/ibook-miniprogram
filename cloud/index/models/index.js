const cloud = require('wx-server-sdk')
cloud.init({ env: process.env.Env })
const db = cloud.database()
const findById = (model, fields = {}, id) => {
  try {
    return db.collection(model)
      .doc(id)
      .field(fields)
      .get()
  } catch (e) {
    console.error(e)
  }
}

const query = (model, fields = {}, options = {}, page = 0, size = 10, order = { name: '_id', orderBy: 'asc' }) => {
  try {
    return db.collection(model)
      .where(options)
      .field(fields)
      .skip(page)
      .limit(size)
      .orderBy(order.name, order.orderBy)
      .get()
  } catch (e) {
    console.error(e)
  }
}

const add = (model, params) => {
  try {
    return db.collection(model).add({
      data: params
    })
  } catch (e) {
    console.error(e)
  }
}

const update = (model, params) => {
  try {
    return db.collection(model).doc(params._id)
      .update({
        data: params
      })
  } catch (e) {
    console.error(e)
  }
}

const remove = (model, id) => {
  try {
    return db.collection(model).doc(id).remove()
  } catch (e) {
    console.error(e)
  }
}

const count = (model, options = {}) => {
  try {
    return db.collection(model).where(options).count()
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  findById,
  query,
  add,
  update,
  remove,
  count
}
