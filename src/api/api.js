import { request, config } from '../utils'
const { api } = config
const { order, user, worker, token } = api

export async function requestLogin (params) {
  return request({
    url: user.requestLogin,
    method: 'post',
    data: params,
  })
}
export async function getOrderList (params,param) {
  return request({
    url: order.getOrderList+'/'+param,
    method: 'post',
    data: params,
  })
}
