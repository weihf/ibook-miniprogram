import { Cart } from '../../api/cart'
import { Order } from '../../api/order'
import { Product } from '../../api/product'
const cart = new Cart()
const product = new Product()
const order = new Order()

Page({
  data: {
    address: [],
    products: [],
    account: [],
    orderStatus: 0,
    oldOrder: false,
    orderId: null,
    from: ''
  },
  onLoad (options) {
    this.data.account = options.account
    if (options.from === 'cart') { // 购物车
      this.setData({
        products: cart.getCartDataFromLocal(true),
        account: options.account,
        orderStatus: 0,
        from: options.from
      })
    } else if (options.from === 'product') { // 商品详情页
      product.getProductById({
        id: options.productId
      })
        .then(res => {
          const product = res.result.data.data
          product.counts = parseInt(options.count)
          const newData = []
          newData.push(product)
          this.setData({
            products: newData,
            account: options.count * product.product_sell_price,
            orderStatus: 0
          })
        })
        .catch(res => {
          console.log(res)
        })
    } else { // 旧订单
      order.getOrderById(options.id
      ).then(res => {
        const data = res.result.data.data
        const address = {}
        address.userName = data.buyer_name
        address.phone = data.buyer_phone
        address.detailAddress = data.buyer_address
        this.setData({
          orderId: data._id,
          address: address,
          products: data.orderdetail,
          account: data.order_amount,
          orderStatus: data.order_status,
          oldOrder: true
        })
      }).catch(res => {
        console.log(res)
      })
    }
  },
  // 地址信息
  addressInfo (event) {
    if (event.detail.status === 'ok') {
      const address = {}
      const addressInfo = event.detail.addressInfo
      address.userName = addressInfo.userName
      address.phone = addressInfo.telNumber
      address.detailAddress = addressInfo.provinceName + addressInfo.cityName + addressInfo.countyName + addressInfo.detailInfo
      this.setData({
        address
      })
    }
  },
  // 提交订单
  confirm: function () {
    // 判断是否选择地址
    if (this.data.address.length === 0) {
      this._showToast('none', '请选择地址')
      return
    }
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userInfo']) {
          wx.showModal({
            title: '授权提示',
            content: '下单需要在个人中心授权！',
            success (res) {
              wx.switchTab({
                url: '/pages/my/my'
              })
            }
          })
        } else {
          // 判断是否是旧订单
          if (this.data.oldOrder) {
            this._showToast('none', '订单支付暂未开通！')
            return
          }
          // 地址拼接
          const orderData = {}
          orderData.address = this.data.address
          orderData.products = this.data.products
          orderData.account = this.data.account
          // 创建订单
          order.creatOrder(orderData).then(res => {
            this._showToast('none', '订单创建成功!')
            // 设置成就订单
            this.setData({
              oldOrder: true
            })

            if (this.data.from === 'cart') {
              const ids = []
              const products = this.data.products
              for (let i = 0; i < products.length; i++) {
                ids.push(products[i]._id)
              }
              cart.delete(ids, res => { })
            }

            setTimeout(() => {
              wx.showModal({
                title: '支付提示',
                content: '个人账号不支持支付功能！',
                success (res) {
                  console.log('准备去我的页面')
                  wx.switchTab({
                    url: '/pages/my/my'
                  })
                }
              })
            }, 1000)
          }).catch(res => {
            console.log(res)
          })
        }
      }
    })
  },

  _showToast: function (type, msg) {
    wx.showToast({
      icon: type,
      title: msg
    })
  }

})
