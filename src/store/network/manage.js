import {request} from '../util';

var domain = `http://shop.xvivx.online`;

if (process.env.NODE_ENV === `development`) {
  domain = `http://192.168.0.103:3000`;
}

export default {

  queryAllCategoreis() {
    return request({
      url: `${domain}/category/get`,
    });
  },
  updateCategory(data) {
    return request({
      url: `${domain}/category/update`,
      data: data,
      type: 'post',
      contentType: false,
      processData: false
    })
  },
  addCategory(data) {
    return request({
      url: `${domain}/category/add`,
      data: data,
      type: 'post',
      contentType: false,
      processData: false
    })
  },
  deleteCategory(data) {
    return request({
      url: `${domain}/category/del`,
      data: data,
      type: 'post',
    })
  },
  queryCommodities(params) {
    return request({
      url: `${domain}/commodity/get`,
    });
  },
  queryCommodityPictures(params) {
    return request({
      url: `${domain}/commodity/pictures`,
      params
    });
  },
  updateCommodity(data) {
    return request({
      url: `${domain}/commodity/update`,
      data: data,
      type: 'post',
      contentType: false,
      processData: false
    })
  },
  queryAllClasses() {
    return request({
      url: `${domain}/classification/query`,
      dataType: `json`
    });
  },
  deleteCommodity(data) {
    return request({
      url: `${domain}/commodity/del`,
      data: data,
      type: 'post',
    })
  },
  addCommodity(data) {
    return request({
      url: `${domain}/commodity/add`,
      data: data,
      type: 'post',
      contentType: false,
      processData: false
    })
  },
  queryClassify() {
    return request({
      url: `${domain}/classification/query`,
    });
  },
  addClassify(data) {
    return request({
      url: `${domain}/classification/add`,
      data: data,
      type: 'post',
    })
  },
  updateClassify(data) {
    return request({
      url: `${domain}/classification/update`,
      data: data,
      type: 'post',
    })
  },
  deleteClassify(data) {
    return request({
      url: `${domain}/classification/delete`,
      data: data,
      type: 'post',
    })
  },
  getBanners(params) {
    return request({
      url: `${domain}/banner/get`,
      params: params,
    })
  },
  uodate(data) {
    return request({
      url: `${domain}/classification/delete`,
      data: data,
      type: 'post',
    })
  },
  addBanner(data) {
    return request({
      url: `${domain}/banner/add`,
      data: data,
      type: 'post',
      contentType: false,
      processData: false
    })
  },
  updateBanner(data) {
    return request({
      url: `${domain}/banner/update`,
      data: data,
      type: 'post',
      contentType: false,
      processData: false
    })
  },
};