import { CloudRequest } from '../utils/request'
class Cart extends CloudRequest {
  _storageKeyName = 'cart'

  getCartData (callback) {
    callback(this.getCartDataFromLocal())
  }

  add (item, counts, callBack) {
    callBack(this._localAdd(item, counts))
  }

  delete (id, callBack) {
    callBack(this._delete(id))
  }

  // 增加商品数量
  addCounts (id, callBack) {
    this._changeCounts(id, 1)
    callBack()
  }

  // 减少商品数量
  cutCounts (id, callBack) {
    this._changeCounts(id, -1)
    callBack()
  }

  // 加入购物车
  _localAdd (item, counts) {
    let cartData = this.getCartDataFromLocal();
    if (!cartData) {
      cartData = []
    }
    let isproduct = this._checkProduct(item._id, cartData)
    console.log('isproduct', isproduct)
    if (isproduct.index === -1) { // 新商品
      item.counts = counts
      item.selectStatus = true
      cartData.push(item)
    } else { // 如果商品已经存在
      cartData[isproduct.index].counts += counts
    }
    this.localSetStorageSync(cartData)
    return cartData
  }

  // 删除
  _delete (id) {
    if (!(id instanceof Array)) {
      id = [id]
    }
    let cartData = this.getCartDataFromLocal()
    for (let i = 0; i < id.length; i++) {
      let hasInfo = this._checkProduct(id[i], cartData)
      if (hasInfo.index != -1) {
        cartData.splice(hasInfo.index, 1)  //删除数组某一项
      }
    }
    this.localSetStorageSync(cartData)
  }

  // 修改商品数目
  _changeCounts (id, counts) {
    let cartData = this.getCartDataFromLocal()
    let hasInfo = this._checkProduct(id, cartData)
    if (hasInfo.index != -1) {
      if (hasInfo.data.counts >= 1) {
        cartData[hasInfo.index].counts += counts
      }
    }
    this.localSetStorageSync(cartData) //更新本地缓存
  }

  // 获取购物车
  getCartDataFromLocal (flag) {
    let res = wx.getStorageSync(this._storageKeyName);
    if (!res) {
      res = []
    }
    if (flag) {
      let newRes = [];
      for (let i = 0; i < res.length; i++) {
        if (res[i].selectStatus) {
          newRes.push(res[i])
        }
      }
      res = newRes
    }
    return res
  }

  // 检查购物车中是否已经存在该商品
  _checkProduct (id, arr) {
    let item, result = { index: -1 };
    for (let i = 0; i < arr.length; i++) {
      item = arr[i];
      if (item._id == id) {
        result = {
          index: i,
          data: item
        }
        break;
      }
    }
    return result;
  }

  // 保存数据
  localSetStorageSync (data) {
    wx.setStorageSync(this._storageKeyName, data);
  }
}
export {
  Cart
}
