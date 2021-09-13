const imgBaseUrl = 'cloud://cloud1-9gk2zsd286c07daf.636c-cloud1-9gk2zsd286c07daf-1306607445'
const table = {
  banner: 'banner',
  theme: 'theme',
  product: 'product',
  category: 'product_category',
  order: 'order'
}
const field = {
  banner: {
    name: true,
    description: true,
    image: true,
    product_id: true
  },
  theme: {
    theme_icon: true,
    theme_name: true,
    theme_type: true
  },
  product: {
    product_name: true,
    product_img: true,
    product_price: true,
    product_sell_price: true,
    product_stock: true,
    product_description: true
  },
  category: {
    category_name: true,
    category_type: true,
    _id: false
  },
  order: {
    buyer_name: true,
    buyer_phone: true,
    buyer_address: true,
    order_amount: true,
    orderdetail: true,
    create_time: true,
    order_status: true
  }
}
module.exports = {
  imgBaseUrl,
  table,
  field
}
