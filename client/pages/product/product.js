// pages/product/product.js
import { Product } from '../../api/product'
import { Cart } from '../../api/cart'
const product = new Product()
const cart = new Cart()
Page({
  data: {
    product: '',
    currentTab: 0
  },

  onLoad: function (options) {
    this._init(options.productId)
  },

  async _init (id) {
    await product.getProductById({
      id: id
    }).then(res => {
      this.setData({
        product: res.result.data.data
      })
    }).catch(res => {
      console.log(res)
    })
  },

  clickTab (event) {
    this.setData({
      currentTab: event.currentTarget.dataset.current
    })
  },

  goHome () {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  focus () {
    wx.showToast({
      icon: 'none',
      title: '暂未开通'
    })
  },

  goCart () {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },

  joinCart () {
    cart.add(this.data.product, 1, res => {
      wx.showToast({
        icon: 'success',
        title: '添加成功'
      })

      wx.switchTab({
        url: '/pages/cart/cart'
      })
    })
  },

  immediately () {
    // 数量默认为1
    const count = 1
    wx.navigateTo({
      url: '../order/order?count=' + count + '&productId=' + this.data.product._id + '&from=product'
    })
  }

})
