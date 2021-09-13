// pages/cart/cart.js
import { Cart } from '../../api/cart'
const cart = new Cart()

Page({
  data: {
    cartData: [],
    selectedCounts: 0, // 总的商品数
    selectedCheckCounts: 0, // 总的商品数
    account: 0
  },

  // 生命周期函数--监听页面显示
  onShow: function () {
    this._init()
  },

  // 生命周期函数--监听页面隐藏
  onHide: function () {
    // 离开页面时，更新本地缓存
    cart.localSetStorageSync(this.data.cartData)
  },

  // 选择商品
  toggleSelect: function (event) {
    const id = event.currentTarget.dataset.id
    const status = event.currentTarget.dataset.status
    const index = this._getProductIndexById(id)
    this.data.cartData[index].selectStatus = !status
    this._resetCartData()
  },

  // 更新商品数量
  changeCounts: function (event) {
    const id = event.currentTarget.dataset.id
    const type = event.currentTarget.dataset.type
    const index = this._getProductIndexById(id)
    let counts = 1
    if (type === 'add') {
      cart.addCounts(id, res => { })
    } else {
      counts = -1
      cart.cutCounts(id, res => { })
    }
    this.data.cartData[index].counts += counts
    this._resetCartData()
  },

  // 删除商品
  delete (event) {
    const id = event.currentTarget.dataset.id
    const index = this._getProductIndexById(id)
    this.data.cartData.splice(index, 1) // 删除某一项商品
    this._resetCartData()
    cart.delete(id, res => { }) // 内存中删除该商品
  },

  productDetail (event) {
    const productId = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/product/product?productId=' + productId
    })
  },

  // 全选
  checkall: function (event) {
    const status = event.currentTarget.dataset.status
    const data = this.data.cartData
    for (let i = 0; i < data.length; i++) {
      data[i].selectStatus = !status
    }
    this._resetCartData()
  },

  // 提交订单
  confirm: function () {
    wx.navigateTo({
      url: '/pages/order/order?account=' + this.data.account + '&from=cart'
    })
  },

  _init: function () {
    cart.getCartData(res => {
      this.setData({
        cartData: res,
        account: this._totalAccountAndCounts(res).account,
        selectedCheckCounts: this._totalAccountAndCounts(res).selectedCheckCounts
      })
    })
  },

  // 计算总金额和选择的商品总数
  _totalAccountAndCounts (data) {
    const len = data.length
    let account = 0
    let selectedCounts = 0
    let selectedCheckCounts = 0
    const multiple = 100
    for (let i = 0; i < len; i++) {
      if (data[i].selectStatus) {
        account += data[i].counts * multiple * Number(data[i].product_sell_price) * multiple
        selectedCounts += data[i].counts
        selectedCheckCounts++
      }
    }
    return {
      selectedCounts: selectedCounts,
      selectedCheckCounts: selectedCheckCounts,
      account: account / (multiple * multiple)
    }
  },

  // 根据商品id得到 商品所在下标
  _getProductIndexById (id) {
    const data = this.data.cartData
    const len = data.length
    for (let i = 0; i < len; i++) {
      if (data[i]._id === id) {
        return i
      }
    }
  },
  // 更新购物车商品数据
  _resetCartData () {
    const newData = this._totalAccountAndCounts(this.data.cartData) // 重新计算总金额和商品总数
    this.setData({
      account: newData.account,
      selectedCounts: newData.selectedCounts,
      selectedCheckCounts: newData.selectedCheckCounts,
      cartData: this.data.cartData
    })
  }
})
