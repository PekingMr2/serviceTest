const API = 'http://180.76.174.246:10002'
const API_LOCAL = 'http://180.76.174.246:10003'

module.exports = {
  name: '',
  prefix: '社保服务',
  footerText: '厦门蓝海健康大数据有限公司 © 2017',
  CORS: ['http://192.168.1.66:10003','http://180.76.174.246:10003'],
  api: {
    user:{
      requestLogin: `${API_LOCAL}/SocialSecurityAction/login`,
    },    
    order:{
      getOrderList: `${API_LOCAL}/SocialSecurityAction`,
    },
  },
}
