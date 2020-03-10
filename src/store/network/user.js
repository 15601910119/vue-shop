import { request } from '../util';

var domain = `http://shop.xvivx.online`;

if (process.env.NODE_ENV === `development`) {
  domain = `http://192.168.0.103:3000`;
}

export default {
  update(data) {
    return request({
      url: `${domain}/user/common/update`,
      data,
      type: `post`
    });
  },
  upload(data) {
    return request({
      url: `${domain}/user/common/upload`,
      data: data,
      type: 'post',
      contentType: false,
      processData: false
    });
  },
  queryAddress() {
    return request({
      url: `${domain}/address/common/get`
    });
  },
  queryAreas() {
    return request({
      url: `${domain}/address/common/areas`
    });
  },
  addAddress(data) {
    return request({
      url: `${domain}/address/common/add`,
      type: 'post',
      data
    });
  },
  updateAddress(data) {
    return request({
      url: `${domain}/address/common/update`,
      type: 'post',
      data
    });
  },
  deleteAddress(data) {
    return request({
      url: `${domain}/address/common/delete`,
      type: 'post',
      data
    });
  },
  addOrder(data) {
    return request({
      url: `${domain}/order/common/add`,
      type: 'post',
      data
    });
  },
  overviewOrder() {
    return request({
      url: `${domain}/order/common/overview`
    });
  },
  getOrder(params) {
    return request({
      url: `${domain}/order/common/get`,
      params
    });
  },
  logout() {
    return request({
      url: `${domain}/user/logout`
    });
  }
};
