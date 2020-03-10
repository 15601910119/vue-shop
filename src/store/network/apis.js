import $ from 'jquery';
import { request } from '../util';
var domain = `http://shop.xvivx.online`;

if (process.env.NODE_ENV === `development`) {
  domain = `http://192.168.0.103:3000`;
}

export default {
  queryBnner() {
    return request({
      url: `${domain}/banner/get`,
    });
  },
  querySpecials() {
    return request({
      url: `${domain}/commodity/common/discounted`
    });
  },
  queryCategoreis() {
    return request({
      url: `${domain}/category/common/query`,
    });
  },
  queryRecmmends() {
    return request({
      url: `${domain}/commodity/common/query`,
    });
  },
  queryCommodityDetail(params) {
    return request({
      url: `${domain}/commodity/common/detail`,
      params: params
    });
  },
  queryHot1() {
    return request({
      url: `${domain}/api/hot/one`,
    });
  },
  queryHot2() {
    return $.ajax({
      url: `${domain}/api/hot/two`,
      dataType: `json`
    });
  },
  login(data) {
    return request({
      url: `${domain}/user/login`,
      type: 'POST',
      data: data,
    });
  },
  signUp(data) {
    return request({
      url: `${domain}/user/sign-up`,
      type: `post`,
      data: data,
    });
  },
  queryAreas() {
    return request({
      url: `${domain}/address/common/areas`,
      dataType: `json`
    });
  },
  getUserInfo() {
    return request({
      url: `${domain}/user/info`,
      silence: true,
    });
  },
  checkName(params) {
    return request({
      url: `${domain}/user/check`,
      params: params,
      silence: true
    });
  },
  addToCart(data) {
    return request({
      url: `${domain}/cart/add`,
      data: data,
      type: `post`
    });
  },
  getCartInfo() {
    return request({
      url: `${domain}/cart/get`,
      silence: true
    });
  }
  ,
  deleteCart(data) {
    return request({
      url: `${domain}/cart/del`,
      type: `post`,
      data: data
    });
  },
  clearCart() {
    return request({
      url: `${domain}/cart/clear`,
      type: `post`,
    });
  },
  payment(data) {
    return request({
      url: `${domain}/order/payment`,
      type: `post`,
      data: data
    });
  },
  cancelOrder(data) {
    return request({
      url: `${domain}/order/cancel`,
      type: `post`,
      data: data
    });
  },
  getOrders(params) {
    return request({
      url: `${domain}/order/common/get`,
      params
    });
  },
  deleteOrder(data) {
    return request({
      url: `${domain}/order/common/del`,
      type: `post`,
      data: data
    });
  },
  overviewOrder() {
    return request({
      url: `${domain}/order/common/overview`,
    });
  },
  sendMessage(data) {
    return request({
      url: `${domain}/message/add`,
      type: `post`,
      data: data
    });
  },
  queryMessage() {
    return request({
      url: `${domain}/message/get`,
    });
  },
  deleteMessage(data) {
    return request({
      url: `${domain}/message/del`,
      type: `post`,
      data: data
    });
  }
};
