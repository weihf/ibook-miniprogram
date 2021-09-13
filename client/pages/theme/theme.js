import { Theme } from '../../api/theme'
const theme = new Theme()
const size = 4
let page = 0
let count = null
let type = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    products: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    type = parseInt(options.product_theme)
    await this._getThemeProduct(type)
  },

  async onReachBottom () {
    page++
    if (this.data.products.length >= this.data.count) {
      wx.showToast({
        title: '已经加载所有数据'
      })
      return
    }
    await this._getThemeProduct(type)
  },
  productDetails (e) {
    wx.navigateTo({
      url: '/pages/product/product?productId=' + e.detail.productId
    })
  },
  async _getThemeProduct (type) {
    if (this.data.products.length === count) {
      wx.showToast({
        title: '已经加载所有数据'
      })
      return
    }
    wx.showLoading({
      title: '加载中...'
    })
    await theme.getThemeProduct(
      { product_theme: type },
      page * size,
      size)
      .then(res => {
        const resdata = res.result.data
        this.setData({
          products: [...this.data.products, ...resdata.list.data]
        })
        count = resdata.count.total
        wx.hideLoading()
      }).catch(res => {
        console.log(res)
        wx.hideLoading()
        wx.showToast({
          title: '数据加载失败'
        })
      })
  }
})
