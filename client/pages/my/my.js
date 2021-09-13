// pages/my/my.js
import { Order } from '../../api/order'
const order = new Order()
const size = 4
let page = 0
let count = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    defaultImg: '../../images/my/header.png',
    orders: []
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    this._getOrders()
  },
  onHide () {
    page = 0
    this.setData({
      orders: []
    })
  },
  async onReachBottom () {
    if (this.data.orders.length >= count) {
      wx.showToast({
        title: '已经加载所有数据'
      })
      return
    }
    page++
    await this._getOrders()
  },
  _getOrders () {
    wx.showLoading({
      title: '加载中...'
    })
    wx.getSetting({
      success: async (res) => {
        if (res.authSetting['scope.userInfo']) {
          await order.getOrderList(
            page * size,
            size
          ).then(res => {
            const resdata = res.result.data
            this.setData({
              orders: [...this.data.orders, ...resdata.list.data]
            })
            count = resdata.count.total
            wx.hideLoading()
          }).catch((res) => {
            console.log(res)
            wx.hideLoading()
            wx.showToast({
              title: '数据加载失败'
            })
          })

          // 获取用户信息
          const userInfo = this.data.userInfo
          wx.getUserInfo({
            success: (res) => {
              userInfo.push(res.userInfo)
              this.setData({
                userInfo: userInfo
              })
            }
          })
        }
      }
    })
  },

  pay (event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/order/order?id=' + id
    })
  },

  getuserinfo (event) {
    this.setData({
      userInfo: event.detail.userInfo
    })
  }

})
