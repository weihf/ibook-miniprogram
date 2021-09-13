import { Index } from '../../api/index'
import { Category } from '../../api/category'
const index = new Index()
const category = new Category()
const size = 4
let page = 0
let count = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuCategories: [],
    menuSelect: 1,
    menuName: '',
    products: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await index.getCategory().then(async res => {
      const menuCategories = res.result.data.data
      this.setData({
        menuCategories: menuCategories,
        menuSelect: menuCategories[0].category_type,
        menuName: menuCategories[0].category_name
      })
      await this._getCategoryProduct(this.data.menuSelect)
    }).catch(res => {
      console.log(res)
    })
  },

  async onReachBottom () {
    page++
    if (this.data.products.length >= this.data.count) {
      wx.showToast({
        title: '已经加载所有数据'
      })
      return
    }
    await this._getCategoryProduct(this.data.menuSelect)
  },

  async toggleMenu (event) {
    const item = this.data.menuCategories[event.currentTarget.dataset.index]
    this.setData({
      menuSelect: event.currentTarget.dataset.id,
      menuName: item.category_name,
      products: []
    })
    await this._getCategoryProduct(this.data.menuSelect)
  },

  productDetails (e) {
    wx.navigateTo({
      url: '/pages/product/product?productId=' + e.detail.productId
    })
  },

  async _getCategoryProduct (type) {
    if (this.data.products.length === count) {
      wx.showToast({
        title: '已经加载所有数据'
      })
      return
    }
    wx.showLoading({
      title: '加载中...'
    })
    await category.getCategoryProduct(
      { category_type: type },
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
