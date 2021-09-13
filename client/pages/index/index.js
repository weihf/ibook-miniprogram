import { Index } from '../../api/index'
const index = new Index()
Page({
  data: {
    banner: [],
    indicatorDots: true,
    autoplay: true,
    themes: [],
    products: []
  },
  async onLoad () {
    await index.getBanner().then(res => {
      this.setData({
        banner: res.result.data.data
      })
    }).catch(res => {
      console.log(res)
    })

    await index.getTheme().then(res => {
      this.setData({
        themes: res.result.data.data
      })
    }).catch(res => {
      console.log(res)
    })

    await index.getBestseller().then(res => {
      this.setData({
        products: res.result.data.data
      })
    }).catch(res => {
      console.log(res)
    })
  },
  themeNavigation (event) {
    wx.navigateTo({
      url: `../theme/theme?product_theme=${event.currentTarget.dataset.themetype}`
    })
  },
  productDetails (event) {
    const productId = event.detail.productId
    wx.navigateTo({
      url: '/pages/product/product?productId=' + productId
    })
  }
})
