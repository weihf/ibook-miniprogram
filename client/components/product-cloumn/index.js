const productBehavior = require('../behaviors/product-behavior.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  behaviors: [productBehavior],
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    productDetails (event) {
      const id = event.currentTarget.dataset.id
      this.triggerEvent('productDetails', { productId: id })
    }
  }
})
