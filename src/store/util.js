import $ from 'jquery';
import { Message, MessageBox } from 'element-ui';
import router from '../router/index';

export function getToken() {
  try {
    return localStorage.getItem(`token`) || ``;
  } catch (err) {
    return ``;
  }
}



export function request(options) {
  var url = options.url;
  var dataType = options.dataType || 'json';
  var type = options.type || 'get';
  var contentType =
    options.contentType === undefined
      ? 'application/json; charset=UTF-8'
      : options.contentType;
  var silence = options.silence;

  var ajaxOptions = {
    url,
    dataType,
    type,
    contentType,
    headers: {
      token: getToken()
    }
  };






  if (options.processData === false) {
    ajaxOptions.processData = false;
  }

  if (type !== 'get') {
    if (contentType === `application/json; charset=UTF-8`) {
      ajaxOptions.data = JSON.stringify(options.data || {});
    } else if (options.data) {
      ajaxOptions.data = options.data;
    }
  } else {
    if (options.params) {
      ajaxOptions.url += `?` + $.param(options.params);
    }
  }

  return new Promise((resolve, reject) => {
    $.ajax(ajaxOptions).then(resp => {
      if (resp.status === `success`) {
        return resolve(resp);
      } else if (resp.status === `loginerror` && !silence) {
        MessageBox.confirm(resp.error, `提示`, {
          confirmButtonText: '去登陆',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          router.push({name: `login`});
        });

        return reject(resp);
      } else {
        silence || Message.error(resp.error || `系统异常`);
        return reject(resp);
      }
    });
  });
}

