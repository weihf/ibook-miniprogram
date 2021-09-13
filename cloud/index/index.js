// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')
const config = require('./config/index')
const banner = require('./controllers/banner')
const theme = require('./controllers/theme')
const product = require('./controllers/product')
const category = require('./controllers/category')
const order = require('./controllers/order')
cloud.init({
  env: 'cloud1-9gn4ef79173de62d'
})

// 图片地址拼接
function _connectImgUrl (data, callback) {
  return new Promise((resolve, reject) => {
    data.then(res => {
      res.data.forEach(callback)
      resolve(res)
    })
  })
}

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({
    event
  })
  app.use(async (ctx, next) => {
    ctx.data = {}
    await next()
  })

  // ===== 首页 =====
  // banner
  app.router('getBanner', async (ctx, next) => {
    ctx.data = await _connectImgUrl(banner.getBanner(), item => {
      item.image = config.imgBaseUrl + item.image
    })
    ctx.body = {
      data: ctx.data
    }
    await next()
  })

  // 主题
  app.router('getTheme', async (ctx, next) => {
    ctx.data = await _connectImgUrl(theme.getTheme(), item => {
      item.theme_icon = config.imgBaseUrl + item.theme_icon
    })
    ctx.body = {
      data: ctx.data
    }
    await next()
  })

  // 畅销产品
  app.router('getBestseller', async (ctx, next) => {
    ctx.data = await _connectImgUrl(product.getProduct({}, 0, 4), item => {
      item.product_img = config.imgBaseUrl + item.product_img
    })
    ctx.body = {
      data: ctx.data
    }
    await next()
  })

  // ===== 分类 =====
  // 分类
  app.router('getCategory', async (ctx, next) => {
    ctx.data = await category.getCategory()
    ctx.body = {
      data: ctx.data
    }
    await next()
  })

  // 分类产品
  app.router('getCategoryProduct', async (ctx, next) => {
    const type = event.data.options.category_type
    ctx.data.count = await category.getCategoryProductCount({ category_type: type })
    ctx.data.list = await _connectImgUrl(category.getCategoryProduct({ category_type: type }, event.data.page, event.data.size), item => {
      item.product_img = config.imgBaseUrl + item.product_img
    })
    ctx.body = {
      data: ctx.data
    }
    await next()
  })

  // 根据主题获取商品
  app.router('getThemeProduct', async (ctx, next) => {
    const type = event.data.options.product_theme
    ctx.data.count = await theme.getThemeProductCount({ product_theme: type })
    ctx.data.list = await _connectImgUrl(theme.getThemeProduct({ product_theme: type }, event.data.page, event.data.size), item => {
      item.product_img = config.imgBaseUrl + item.product_img
    })
    ctx.body = {
      data: ctx.data
    }
    await next()
  })

  // 根据 id 获取商品
  app.router('getProductById', async (ctx, next) => {
    const id = event.data.options.id
    const result = await product.getProductById(id)
    console.log('result:', result)
    console.log('config.imgBaseUrl:', config.imgBaseUrl)
    result.data.product_img = config.imgBaseUrl + result.data.product_img
    ctx.data = result
    console.log('ctx.data:', ctx.data)
    ctx.body = {
      data: ctx.data
    }
    await next()
  })

  // ===== 订单 =====

  // 生成订单
  app.router('creatOrder', async (ctx, next) => {
    const { OPENID } = cloud.getWXContext()
    ctx.data = await order.createOrder(event.data.orderData, OPENID)
    ctx.body = {
      data: ctx.data
    }
    await next()
  })

  // 根据 id 获取订单信息
  app.router('getOrderById', async (ctx, next) => {
    const orderId = event.data.id
    ctx.data = await order.getOrderById(orderId)
    ctx.body = {
      data: ctx.data
    }
    await next()
  })

  // 获取订单列表
  app.router('getOrderList', async (ctx, next) => {
    const { OPENID } = cloud.getWXContext()
    ctx.data.count = await order.getOrderListCount()
    ctx.data.list = await _connectImgUrl(order.getOrderList(OPENID, event.data.page, event.data.size), item => {
      item.product_img = config.imgBaseUrl + item.orderdetail.product_img
    })
    console.log('ctx.data:', ctx.data)
    ctx.body = {
      data: ctx.data
    }
    await next()
  })
  return app.serve()
}
